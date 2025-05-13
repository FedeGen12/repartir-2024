# language: es
@eliminar_gasto
Característica: Eliminar gastos de un grupo

  Regla: El total de un grupo no debe ser negativo

    Escenario: Eliminar un gasto menor o igual al total
      Dado que ya existe un grupo con saldo '7000'
      Cuando el usuario reduce el saldo en '700'
      Entonces debería visualizar dentro del listado el grupo con total '$  6.300,00'

    @pendiente
    Escenario: Eliminar un gasto en un grupo sin gastos
      Dado que ya existe un grupo con saldo '0'
      Cuando el usuario reduce el saldo en '700'
      Entonces debería visualizar dentro del listado el grupo con total '$  0,00'

    @pendiente
    Escenario: Eliminar un gasto mayor al total
      Dado que ya existe un grupo con saldo '700'
      Cuando el usuario reduce el saldo en '7000'
      Entonces debería visualizar dentro del listado el grupo con total '$  0,00'