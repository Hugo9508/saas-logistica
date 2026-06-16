-- Función para actualizar el saldo en la cuenta corriente al confirmar un pago
CREATE OR REPLACE FUNCTION funcion_actualizar_saldo_cc()
RETURNS TRIGGER AS $$
BEGIN
    -- Solo actuamos si el pago pasa a estado 'pagado'
    IF (NEW.estado = 'pagado' AND (OLD.estado IS NULL OR OLD.estado != 'pagado')) THEN
        
        -- Si el pago está vinculado a una cuenta corriente (cliente o proveedor)
        IF NEW.origen_tipo IN ('PROVEEDOR', 'CLIENTE') AND NEW.origen_id IS NOT NULL THEN
            UPDATE cuenta_corriente
            SET 
                pagos_pesos = pagos_pesos + COALESCE(CASE WHEN NEW.moneda = 'UYU' THEN NEW.monto ELSE 0 END, 0),
                pagos_usd = pagos_usd + COALESCE(CASE WHEN NEW.moneda = 'USD' THEN NEW.monto ELSE 0 END, 0),
                saldo_pesos = saldo_pesos - COALESCE(CASE WHEN NEW.moneda = 'UYU' THEN NEW.monto ELSE 0 END, 0),
                saldo_usd = saldo_usd - COALESCE(CASE WHEN NEW.moneda = 'USD' THEN NEW.monto ELSE 0 END, 0)
            WHERE id = NEW.origen_id;
        END IF;
        
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger que se dispara después de insertar o actualizar un pago
DROP TRIGGER IF EXISTS trg_actualizar_saldo_pago ON pagos;
CREATE TRIGGER trg_actualizar_saldo_pago
AFTER INSERT OR UPDATE ON pagos
FOR EACH ROW
EXECUTE FUNCTION funcion_actualizar_saldo_cc();
