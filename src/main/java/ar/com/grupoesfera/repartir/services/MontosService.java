package ar.com.grupoesfera.repartir.services;

import ar.com.grupoesfera.repartir.model.Gasto;
import ar.com.grupoesfera.repartir.model.Grupo;
import ar.com.grupoesfera.repartir.model.ReduccionGasto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class MontosService {

    public void inicializarTotal(Grupo grupo) {

        grupo.setTotal(BigDecimal.valueOf(0,2));
    }

    public void acumularAlTotal(Grupo grupo, Gasto gasto) {

        BigDecimal total = grupo.getTotal();
        total = total.add(gasto.getMonto());
        grupo.setTotal(total);
    }

    public void quitarAlTotal(Grupo grupo, ReduccionGasto reduccion) {

        BigDecimal total = grupo.getTotal();
        BigDecimal monto = reduccion.getMonto();
        if (total.compareTo(monto) >= 0) {
            total = total.subtract(monto);
            grupo.setTotal(total);
        } else {
            grupo.setTotal(BigDecimal.valueOf(0,2));
        }
    }
}
