package ar.com.grupoesfera.repartir.steps.gastos;

import ar.com.grupoesfera.repartir.steps.CucumberSteps;
import io.cucumber.java.es.Cuando;
import io.cucumber.java.es.Dado;
import io.cucumber.java.es.Entonces;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.assertj.core.api.Assertions.assertThat;
import static org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated;

public class EliminarGastosSteps extends CucumberSteps {

    private final Integer idGrupo = 7;

    @Dado("que ya existe un grupo con saldo {string}")
    public void existeUnGrupoConSaldo(String monto) {
        crear_nuevo_grupo();

        iniciar_sesion_en_repartir();

        modificar_gasto_al_grupo(monto, "agregarGastoGruposButton-");
    }

    @Cuando("el usuario reduce el saldo en {string}")
    public void reducirSaldoEn(String monto) {
        modificar_gasto_al_grupo(monto, "reducirGastoGruposButton-");
    }

    @Entonces("debería visualizar dentro del listado el grupo con total {string}")
    public void deberiaVisualizaDentroDelListadoElGrupoCreadoConTotal$(String monto) {
        var grupoTR = driver.findElements(By.cssSelector("app-grupos table tr"));

        var campoTDs = grupoTR.get(1).findElements(By.tagName("td"));
        assertThat(campoTDs.get(0).getText()).isNotEmpty();
        assertThat(campoTDs.get(2).getText()).isEqualTo(monto);
    }

    private void iniciar_sesion_en_repartir() {
        driver.navigate().to(url("/"));

        var wait2 = new WebDriverWait(driver, 2);
        wait2.until(visibilityOfElementLocated(By.id("iniciarDialog")));

        driver.findElement(By.id("usuarioInput")).sendKeys("Martin");
        var iniciarButton = driver.findElement(By.id("iniciarBienvenidaButton"));
        iniciarButton.click();
    }

    private void crear_nuevo_grupo() {
        baseDeDatos.tieneElGrupoSinGastos(idGrupo, "Grupo de prueba");
    }

    private void modificar_gasto_al_grupo(String monto, String id_boton) {
        var wait = new WebDriverWait(driver, 2);
        var agregarGastoButton = wait.until(visibilityOfElementLocated(By.id(id_boton + idGrupo)));
        agregarGastoButton.click();

        var montoInput = driver.findElement(By.id("montoGastoNuevoInput"));
        montoInput.clear();
        montoInput.sendKeys(monto);

        var guardarGastoNuevoButton = driver.findElement(By.id("guardarGastoNuevoButton"));
        guardarGastoNuevoButton.click();

        wait.until(visibilityOfElementLocated(By.id("mensajesToast")));
    }
}
