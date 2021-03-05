# Api para el control de gastos
Ingresa tus ingresos y gastos y ve obserbando como va el flujo de tu dinero
***

## Endpoint

### Endpoint de usuarios
```
Registro:
***
POST -> /api/user/signup
form-data -> email | password | name

Inicio de sesión: 
***
POST -> /api/user/signin
form-data -> email | password 

```

### Endpoint de ingresos 
```
Crear in ingreso: 
***
POST -> /api/entry/create
form-data -> amount | month:number | year:number

Actualizar un ingreso
***
POST -> /api/entry/update/:id
form-data -> amount
Nota: El monto cuando ya hay egresos ya solo puedes actualizar el monto cuando este es mayor

Obtener ingreso por ID:
***
GET -> /api/entry/:id

Obtener ingresos de un año:
***
GET -> /api/entry/:year

```

### Endpoint de iegresos 
```
Crear in egreso: 
***
POST -> /api/expense/create/:ingresoId
form-data -> title | amount:number | hasInvoice:boolean

Actualizar un egreso
***
POST -> /api/expense/update/:id
form-data -> title | amount:number | hasInvoice:boolean

Obtener egreso:
***
GET -> /api/expense/:ingresoId

Eliminar egreso:
***
DELETE -> /api/expense/delete/:id

```

## Autenticacion
Todos los endpoint excepto por los del usuario necesitan del header ``x-token``