# Plan de Desarrollo — Calendario Local en React

## 1. Descripción general

Desarrollar una aplicación web en **React** que funcione como un calendario personal 100% local, sin backend, sin autenticación y sin servicios externos obligatorios.

La aplicación permitirá:

- Visualizar un calendario real por meses y años.
- Navegar entre meses y años.
- Identificar visualmente los días que contienen eventos.
- Abrir el detalle de cualquier día.
- Crear múltiples eventos para una fecha.
- Editar eventos existentes.
- Eliminar eventos.
- Marcar eventos como pendientes o completados.
- Consultar estadísticas sencillas.
- Ver próximos eventos.
- Ver eventos pasados.
- Ver eventos completados.
- Cambiar entre modo claro y modo oscuro.
- Mantener todos los datos guardados localmente en el navegador.

---

# 2. Objetivo del proyecto

Crear una aplicación sencilla, rápida y visualmente limpia para administrar eventos personales mediante un calendario real.

La aplicación deberá funcionar completamente en el navegador y conservar la información incluso después de cerrar o recargar la página mediante almacenamiento local.

---

# 3. Alcance

## Incluido

- React.
- JavaScript o TypeScript.
- Almacenamiento local.
- Calendario mensual real.
- Navegación entre meses.
- Navegación entre años.
- Fecha actual resaltada.
- Eventos asociados a fechas.
- CRUD de eventos.
- Estados de eventos.
- Estadísticas.
- Tema claro.
- Tema oscuro.
- Diseño responsive.

## No incluido

- Backend.
- API propia.
- Base de datos remota.
- Login.
- Registro.
- Roles.
- Multiusuario.
- Sincronización entre dispositivos.
- Google Calendar.
- Outlook Calendar.
- Notificaciones push.
- Correos electrónicos.

---

# 4. Stack recomendado

## Base

- React
- TypeScript
- Vite

## Manejo de fechas

Recomendado:

- `date-fns`

Alternativa:

- `dayjs`

Evitar implementar manualmente cálculos complejos de fechas cuando una librería probada pueda resolverlos.

## Estilos

Opción recomendada:

- Tailwind CSS

También puede utilizarse:

- CSS Modules
- CSS puro

## Iconos

- Lucide React

## Estado global

Para el tamaño de este proyecto es suficiente utilizar:

- Context API

No es obligatorio utilizar Redux, Zustand o similares.

---

# 5. Persistencia local

Utilizar:

```text
localStorage
```

Todos los eventos deberán almacenarse en el navegador.

Clave recomendada:

```text
calendar_events
```

Para el tema:

```text
calendar_theme
```

---

# 6. Modelo de datos

## Event

```ts
type EventStatus = "pending" | "completed";

interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
}
```

Ejemplo:

```json
{
  "id": "uuid",
  "date": "2026-10-07",
  "title": "Entrega del proyecto",
  "description": "Entregar versión final del proyecto",
  "status": "pending",
  "createdAt": "2026-10-07T15:00:00.000Z",
  "updatedAt": "2026-10-07T15:00:00.000Z"
}
```

---

# 7. Reglas importantes para las fechas

Las fechas asociadas al calendario deben almacenarse utilizando:

```text
YYYY-MM-DD
```

Ejemplo:

```text
2026-10-07
```

Esto permite buscar fácilmente todos los eventos pertenecientes a un día.

Los campos:

```text
createdAt
updatedAt
```

pueden almacenarse como fechas ISO completas.

Ejemplo:

```text
2026-10-07T21:34:00.000Z
```

---

# 8. Estructura propuesta del proyecto

```text
src/
├── components/
│   ├── calendar/
│   │   ├── Calendar.tsx
│   │   ├── CalendarHeader.tsx
│   │   ├── CalendarGrid.tsx
│   │   ├── CalendarDay.tsx
│   │   └── WeekDaysHeader.tsx
│   │
│   ├── events/
│   │   ├── EventCard.tsx
│   │   ├── EventList.tsx
│   │   ├── EventForm.tsx
│   │   ├── EventStatusBadge.tsx
│   │   └── DeleteEventDialog.tsx
│   │
│   ├── statistics/
│   │   ├── StatisticsCards.tsx
│   │   ├── UpcomingEvents.tsx
│   │   ├── PastEvents.tsx
│   │   └── CompletedEvents.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Layout.tsx
│   │   └── ThemeToggle.tsx
│   │
│   └── common/
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── EmptyState.tsx
│       └── ConfirmDialog.tsx
│
├── context/
│   ├── EventsContext.tsx
│   └── ThemeContext.tsx
│
├── hooks/
│   ├── useEvents.ts
│   ├── useLocalStorage.ts
│   └── useTheme.ts
│
├── pages/
│   ├── CalendarPage.tsx
│   ├── DayDetailsPage.tsx
│   └── StatisticsPage.tsx
│
├── services/
│   └── eventStorage.ts
│
├── utils/
│   ├── calendar.ts
│   ├── dates.ts
│   └── statistics.ts
│
├── types/
│   └── event.ts
│
├── App.tsx
└── main.tsx
```

---

# 9. Navegación principal

La aplicación tendrá dos secciones principales:

```text
Calendario
Estadísticas
```

La navegación puede mostrarse mediante:

- Navbar superior.
- Sidebar en escritorio.
- Navbar inferior en móvil.

Para un proyecto pequeño se recomienda una navbar superior.

---

# 10. Pantalla principal — Calendario

La pantalla principal mostrará:

```text
< Octubre 2026 >

Lun Mar Mié Jue Vie Sáb Dom

         1   2   3   4
 5   6   7   8   9  10  11
12  13  14  15  16  17  18
...
```

Debe permitir:

- Ir al mes anterior.
- Ir al mes siguiente.
- Volver al mes actual.
- Opcionalmente seleccionar mes.
- Opcionalmente seleccionar año.

---

# 11. Calendario 100% real

El calendario debe calcular dinámicamente:

- Número de días de cada mes.
- Día de la semana en que comienza el mes.
- Años bisiestos.
- Cambio de diciembre a enero.
- Cambio de enero a diciembre.
- Fecha actual.
- Mes actual.
- Año actual.

Ejemplos:

```text
Febrero 2024 → 29 días
Febrero 2025 → 28 días
```

No deben existir meses o días escritos manualmente como estructura fija.

---

# 12. Comportamiento de cada día

Cada celda debe mostrar:

- Número del día.
- Indicador visual cuando existen eventos.
- Estilo especial para el día actual.

Ejemplo sin eventos:

```text
7
```

Ejemplo con eventos:

```text
7
●
```

Si existen varios eventos podría mostrarse:

```text
7

3 eventos
```

o utilizar varios puntos de estado.

---

# 13. Indicadores visuales de eventos

Cada día con eventos deberá ser fácilmente reconocible.

Ejemplo:

```text
Pendientes → punto o badge
Completados → indicador secundario
```

Una opción sencilla:

```text
● 3
```

donde `3` representa la cantidad total de eventos.

También puede utilizarse un pequeño resumen:

```text
2 pendientes
1 completado
```

Evitar sobrecargar las celdas del calendario.

---

# 14. Interacción con un día

Al hacer clic sobre cualquier día:

```text
Calendario
   ↓
Día seleccionado
   ↓
Vista de detalle
```

Ejemplo:

```text
7 de octubre de 2026

Eventos

[ Pendiente ]
Entrega del proyecto

[ Completado ]
Comprar materiales

+ Nuevo evento
```

---

# 15. Vista de detalle del día

La pantalla deberá mostrar:

- Fecha completa.
- Cantidad de eventos.
- Lista de eventos.
- Estado de cada evento.
- Botón para crear evento.
- Botón para editar cada evento.
- Botón para eliminar cada evento.
- Acción para marcar pendiente/completado.

Si no existen eventos:

```text
No hay eventos registrados para este día.

[ Crear evento ]
```

---

# 16. Crear evento

Formulario:

```text
Título
Descripción
Estado
```

## Título

- Obligatorio.
- Longitud recomendada máxima: 100 caracteres.

## Descripción

- Opcional o requerida según implementación.
- Longitud máxima recomendada: 500 caracteres.

## Estado

Opciones:

```text
Pendiente
Completado
```

Por defecto:

```text
Pendiente
```

---

# 17. Editar evento

El usuario podrá modificar:

- Título.
- Descripción.
- Estado.

No será necesario modificar la fecha desde esta pantalla inicialmente.

Si en el futuro se desea soportar mover eventos, puede agregarse un selector de fecha.

---

# 18. Eliminar evento

Antes de eliminar:

```text
¿Eliminar este evento?

Esta acción no se puede deshacer.

[Cancelar] [Eliminar]
```

El evento deberá eliminarse inmediatamente de:

- Vista del día.
- Calendario.
- Estadísticas.
- localStorage.

---

# 19. Cambiar estado del evento

Cada evento tendrá dos estados:

```text
pending
completed
```

Visualmente:

```text
Pendiente
Completado
```

Debe ser posible cambiar rápidamente entre ambos estados.

Ejemplo:

```text
[ ✓ Marcar como completado ]
```

Cuando esté completado:

```text
[ ↶ Marcar como pendiente ]
```

---

# 20. Orden de eventos del día

Orden recomendado:

1. Pendientes.
2. Completados.

Dentro de cada grupo:

- Por fecha de creación.
- O alfabéticamente.

---

# 21. Sección de estadísticas

Crear una pantalla separada:

```text
/estadisticas
```

o equivalente.

Debe mostrar información sencilla y útil sin convertirse en un dashboard complejo.

---

# 22. Tarjetas principales de estadísticas

Ejemplo:

```text
┌──────────────────┐
│ Próximos eventos │
│        8         │
└──────────────────┘

┌──────────────────┐
│ Eventos pasados  │
│        14        │
└──────────────────┘

┌──────────────────┐
│ Completados      │
│        23        │
└──────────────────┘

┌──────────────────┐
│ Pendientes       │
│        6         │
└──────────────────┘
```

---

# 23. Definición de estadísticas

## Próximos eventos

Eventos cuya fecha sea:

```text
>= hoy
```

y opcionalmente cuyo estado sea:

```text
pending
```

Recomendación:

Considerar como "próximos" solamente los pendientes cuya fecha sea hoy o futura.

---

## Eventos pasados

Eventos cuya fecha sea:

```text
< hoy
```

Se pueden incluir tanto pendientes como completados.

Además se puede mostrar particularmente:

```text
Eventos vencidos
```

Definición:

```text
fecha < hoy
AND
status === "pending"
```

Esto resulta especialmente útil.

---

## Eventos completados

```text
status === "completed"
```

independientemente de la fecha.

---

# 24. Listas dentro de estadísticas

Además de los contadores, la pantalla puede mostrar:

## Próximos eventos

Mostrar los próximos 5 o 10.

Ejemplo:

```text
10 Oct
Reunión del proyecto

12 Oct
Comprar material

15 Oct
Entrega final
```

Orden:

```text
fecha ascendente
```

---

## Eventos pasados

Mostrar eventos anteriores a hoy.

Orden:

```text
más recientes primero
```

---

## Eventos completados

Mostrar eventos completados recientemente.

Orden:

```text
updatedAt descendente
```

---

# 25. Estado vacío de estadísticas

Ejemplo:

```text
No tienes próximos eventos.
```

o:

```text
Todavía no has completado ningún evento.
```

---

# 26. Tema claro y oscuro

La aplicación tendrá:

```text
Light Mode
Dark Mode
```

El usuario podrá cambiar el tema desde la barra principal.

Ejemplo:

```text
☀ / 🌙
```

---

# 27. Persistencia del tema

Guardar preferencia en:

```text
localStorage
```

Ejemplo:

```text
calendar_theme = "dark"
```

Valores:

```text
light
dark
```

Al abrir nuevamente la aplicación deberá conservarse la última selección.

---

# 28. Comportamiento inicial del tema

Si no existe una preferencia almacenada:

1. Consultar `prefers-color-scheme`.
2. Utilizar la preferencia del sistema.

Ejemplo:

```ts
window.matchMedia("(prefers-color-scheme: dark)").matches
```

---

# 29. Diseño visual

Estilo recomendado:

- Minimalista.
- Limpio.
- Moderno.
- Pocos colores.
- Bordes suaves.
- Sombras discretas.
- Tipografía clara.
- Espaciado consistente.

---

# 30. Responsive

Debe funcionar correctamente en:

- Desktop.
- Laptop.
- Tablet.
- Smartphone.

---

# 31. Calendario responsive

## Desktop

Mostrar semana completa:

```text
Lun Mar Mié Jue Vie Sáb Dom
```

Cada día tendrá suficiente espacio para:

- Número.
- Indicadores.
- Cantidad de eventos.

## Móvil

Mantener las 7 columnas pero reducir:

- Texto.
- Márgenes.
- Tamaño de badges.

Evitar scroll horizontal siempre que sea posible.

---

# 32. Contexto global de eventos

Crear:

```text
EventsContext
```

Responsabilidades:

- Obtener eventos.
- Crear eventos.
- Actualizar eventos.
- Eliminar eventos.
- Cambiar estados.
- Consultar eventos por fecha.

API interna sugerida:

```ts
interface EventsContextType {
  events: CalendarEvent[];

  addEvent: (
    event: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">
  ) => void;

  updateEvent: (
    id: string,
    data: Partial<CalendarEvent>
  ) => void;

  deleteEvent: (id: string) => void;

  toggleEventStatus: (id: string) => void;

  getEventsByDate: (date: string) => CalendarEvent[];
}
```

---

# 33. Servicio de almacenamiento

Crear:

```text
src/services/eventStorage.ts
```

Responsabilidades:

```text
getEvents()
saveEvents()
clearEvents()
```

Ejemplo conceptual:

```ts
const STORAGE_KEY = "calendar_events";
```

---

# 34. Hook useLocalStorage

Crear un hook reutilizable:

```text
useLocalStorage
```

Debe permitir:

- Leer valor.
- Escribir valor.
- Inicializar datos.
- Manejar JSON.
- Manejar errores de parseo.

---

# 35. Utilidades de calendario

Crear:

```text
src/utils/calendar.ts
```

Funciones posibles:

```ts
getDaysInMonth()
getFirstDayOfMonth()
generateCalendarDays()
isToday()
isSameDate()
formatCalendarDate()
```

---

# 36. Celdas del mes anterior y siguiente

Para mantener una cuadrícula consistente puede mostrarse:

```text
Lun Mar Mié Jue Vie Sáb Dom

29  30   1   2   3   4   5
```

Los días fuera del mes actual deberán mostrarse visualmente atenuados.

Opciones:

### Opción recomendada

Permitir hacer clic también sobre ellos y cambiar automáticamente al mes correspondiente.

---

# 37. Generación de IDs

Utilizar:

```ts
crypto.randomUUID()
```

Ejemplo:

```ts
const id = crypto.randomUUID();
```

No depender de IDs incrementales.

---

# 38. Validaciones

## Crear / editar evento

Validar:

- Título no vacío.
- Título sin espacios únicamente.
- Fecha válida.
- Estado válido.
- Descripción dentro del límite permitido.

---

# 39. Manejo de errores de localStorage

Contemplar situaciones como:

- JSON corrupto.
- Valor inexistente.
- Datos con formato antiguo.
- `localStorage` inaccesible.

Fallback:

```text
[]
```

Nunca permitir que la aplicación deje de renderizar por un error al leer almacenamiento local.

---

# 40. Accesibilidad

Agregar:

- `aria-label`.
- Navegación mediante teclado.
- Botones reales.
- Buen contraste.
- Indicadores que no dependan únicamente del color.
- Focus visible.

Ejemplo:

```text
● 2 eventos
```

es preferible a mostrar únicamente un punto de color.

---

# 41. Rutas sugeridas

Si se utiliza React Router:

```text
/
    Calendario

/day/:date
    Detalle del día

/statistics
    Estadísticas
```

Ejemplo:

```text
/day/2026-10-07
```

---

# 42. React Router

Dependencia recomendada:

```bash
npm install react-router-dom
```

Permite que la pantalla de detalle pueda abrirse directamente mediante URL.

---

# 43. Formato visual de fechas

Datos internos:

```text
2026-10-07
```

Interfaz:

```text
Miércoles, 7 de octubre de 2026
```

La lógica interna nunca debe depender del texto traducido mostrado al usuario.

---

# 44. Idioma

La aplicación inicialmente estará en:

```text
Español
```

Días:

```text
Lun
Mar
Mié
Jue
Vie
Sáb
Dom
```

Meses:

```text
Enero
Febrero
Marzo
Abril
Mayo
Junio
Julio
Agosto
Septiembre
Octubre
Noviembre
Diciembre
```

---

# 45. Flujo general

```text
Inicio
 ↓
Calendario
 ↓
Seleccionar día
 ↓
Detalle del día
 ↓
Crear / editar / eliminar evento
 ↓
Guardar en localStorage
 ↓
Actualizar calendario
 ↓
Actualizar estadísticas
```

---

# 46. Fase 1 — Base, arquitectura y calendario

## Objetivo

Construir la estructura del proyecto y conseguir un calendario completamente funcional.

## TODO

- [x] Crear proyecto React con Vite.
- [x] Configurar TypeScript.
- [x] Instalar dependencias.
- [x] Configurar estilos.
- [x] Instalar React Router.
- [x] Instalar `date-fns`.
- [x] Instalar Lucide React.
- [x] Crear estructura de carpetas.
- [x] Crear layout principal.
- [x] Crear Navbar.
- [x] Crear ruta Calendario.
- [x] Crear ruta Estadísticas.
- [x] Crear ruta de detalle de día.
- [x] Crear `Calendar`.
- [x] Crear `CalendarHeader`.
- [x] Crear encabezado de días de semana.
- [x] Crear `CalendarGrid`.
- [x] Crear `CalendarDay`.
- [x] Implementar cálculo del número real de días.
- [x] Implementar años bisiestos.
- [x] Implementar cálculo de posición del primer día.
- [x] Implementar navegación al mes anterior.
- [x] Implementar navegación al mes siguiente.
- [x] Implementar navegación entre años.
- [x] Implementar botón "Hoy".
- [x] Resaltar día actual.
- [x] Permitir seleccionar cualquier día.
- [x] Crear navegación hacia detalle del día.
- [x] Hacer calendario responsive.

## Resultado esperado

Al finalizar esta fase deberá existir un calendario real navegable, aunque todavía no tenga eventos.

---

# 47. Fase 2 — Eventos y almacenamiento local

## Objetivo

Implementar completamente la administración local de eventos.

## TODO

- [x] Crear modelo `CalendarEvent`.
- [x] Crear tipo `EventStatus`.
- [x] Crear `eventStorage.ts`.
- [x] Crear `useLocalStorage`.
- [x] Crear `EventsContext`.
- [x] Implementar lectura desde localStorage.
- [x] Implementar escritura en localStorage.
- [x] Crear función `addEvent`.
- [x] Crear función `updateEvent`.
- [x] Crear función `deleteEvent`.
- [x] Crear función `toggleEventStatus`.
- [x] Crear función `getEventsByDate`.
- [x] Crear pantalla `DayDetailsPage`.
- [x] Mostrar fecha seleccionada.
- [x] Mostrar lista de eventos.
- [x] Crear componente `EventCard`.
- [x] Crear componente `EventStatusBadge`.
- [x] Crear formulario de nuevo evento.
- [x] Validar título.
- [x] Validar descripción.
- [x] Definir estado pendiente por defecto.
- [x] Implementar edición de evento.
- [x] Implementar eliminación.
- [x] Agregar confirmación de eliminación.
- [x] Implementar cambio pendiente/completado.
- [x] Sincronizar modificaciones con localStorage.
- [x] Mostrar indicador en días con eventos.
- [x] Mostrar número de eventos en el calendario.
- [x] Actualizar calendario inmediatamente después de cualquier modificación.
- [x] Implementar estados vacíos.
- [x] Probar persistencia después de recargar la página.

## Resultado esperado

La aplicación permitirá administrar eventos completamente mediante almacenamiento local.

---

# 48. Fase 3 — Estadísticas, temas y pulido final

## Objetivo

Agregar estadísticas, modo oscuro y mejorar la experiencia visual.

## TODO

### Estadísticas

- [x] Crear `StatisticsPage`.
- [x] Crear funciones de cálculo.
- [x] Calcular próximos eventos.
- [x] Calcular eventos pasados.
- [x] Calcular eventos completados.
- [x] Calcular eventos pendientes.
- [x] Calcular eventos vencidos.
- [x] Crear tarjetas de estadísticas.
- [x] Crear lista de próximos eventos.
- [x] Ordenar próximos eventos por fecha.
- [x] Crear lista de eventos pasados.
- [x] Crear lista de eventos completados.
- [x] Crear estados vacíos.

### Tema

- [x] Crear `ThemeContext`.
- [x] Crear `useTheme`.
- [x] Detectar tema del sistema.
- [x] Crear `ThemeToggle`.
- [x] Implementar modo claro.
- [x] Implementar modo oscuro.
- [x] Guardar preferencia en localStorage.
- [x] Restaurar tema después de recargar.

### Diseño

- [x] Mejorar espaciados.
- [x] Añadir transiciones discretas.
- [x] Revisar contraste.
- [x] Mejorar formularios.
- [x] Mejorar modal de confirmación.
- [x] Optimizar móvil.
- [x] Optimizar tablet.
- [x] Optimizar escritorio.
- [x] Revisar accesibilidad.
- [x] Añadir estados hover.
- [x] Añadir estados focus.
- [x] Añadir feedback visual al guardar.
- [x] Añadir feedback visual al eliminar.

## Resultado esperado

Aplicación completamente terminada y lista para uso diario.

---

# 49. Lógica de estadísticas

## Próximos pendientes

```ts
event.date >= today && event.status === "pending"
```

## Pasados

```ts
event.date < today
```

## Vencidos

```ts
event.date < today && event.status === "pending"
```

## Completados

```ts
event.status === "completed"
```

## Pendientes

```ts
event.status === "pending"
```

---

# 50. Consideración importante sobre "hoy"

No comparar fechas ISO completas para decidir si un evento pertenece al pasado o futuro.

Comparar únicamente:

```text
YYYY-MM-DD
```

Esto evita errores provocados por:

- Horas.
- Zona horaria.
- UTC.
- Conversión automática del navegador.

---

# 51. Experiencia visual recomendada

## Día normal

```text
┌──────────┐
│  7       │
│          │
│          │
└──────────┘
```

## Día actual

```text
┌──────────┐
│ [7] HOY  │
│          │
│          │
└──────────┘
```

## Día con eventos

```text
┌──────────┐
│  8       │
│ ● 3      │
│ eventos  │
└──────────┘
```

---

# 52. Colores de estado

No depender exclusivamente de colores.

Ejemplo:

```text
Pendiente   → ● Pendiente
Completado  → ✓ Completado
```

En modo oscuro los colores deberán seguir manteniendo contraste suficiente.

---

# 53. Interacciones recomendadas

Calendario:

```text
Click en día
    ↓
Detalle del día
```

Evento:

```text
Click editar
    ↓
Formulario

Click completar
    ↓
Cambio inmediato

Click eliminar
    ↓
Confirmación
```

---

# 54. Datos de prueba

Crear temporalmente eventos como:

```text
Hoy
- Revisar proyecto
- Comprar materiales

Mañana
- Reunión

Hace 2 días
- Entregar reporte
```

Estados:

```text
pending
completed
```

Esto permitirá validar rápidamente:

- Calendario.
- Estadísticas.
- Indicadores.
- Ordenamiento.
- Estados.

Los datos de prueba deberán eliminarse antes de producción.

---

# 55. Pruebas mínimas

## Calendario

- [x] Enero muestra 31 días.
- [x] Febrero normal muestra 28.
- [x] Febrero bisiesto muestra 29.
- [x] Abril muestra 30.
- [x] Diciembre → siguiente mes = enero del próximo año.
- [x] Enero → mes anterior = diciembre del año anterior.
- [x] Día actual se resalta correctamente.

## Eventos

- [x] Crear evento.
- [x] Crear múltiples eventos el mismo día.
- [x] Editar evento.
- [x] Eliminar evento.
- [x] Cambiar estado.
- [x] Persistir al recargar.
- [x] Día muestra indicador.
- [x] Indicador desaparece si ya no existen eventos.

## Estadísticas

- [x] Próximos correctamente calculados.
- [x] Pasados correctamente calculados.
- [x] Completados correctamente calculados.
- [x] Pendientes correctamente calculados.
- [x] Vencidos correctamente calculados.

## Tema

- [x] Light funciona.
- [x] Dark funciona.
- [x] Tema persiste.
- [x] Tema inicial respeta sistema.

---

# 56. Mejoras opcionales futuras

Estas funcionalidades NO forman parte del MVP inicial.

- Categorías.
- Colores personalizados.
- Horario del evento.
- Evento de día completo.
- Repetición de eventos.
- Recordatorios.
- Notificaciones.
- Exportación JSON.
- Importación JSON.
- Copia de seguridad.
- Buscar eventos.
- Filtrar eventos.
- Vista semanal.
- Vista anual.
- Drag & drop.
- Mover eventos entre fechas.
- Etiquetas.
- Prioridades.
- PWA.
- Instalación en escritorio/móvil.
- IndexedDB.
- Sincronización con Google Calendar.

---

# 57. Posible migración futura de almacenamiento

Para el MVP:

```text
localStorage
```

Si la aplicación crece considerablemente:

```text
IndexedDB
```

No realizar esta migración durante las primeras fases salvo que exista una razón real.

---

# 58. Criterios de aceptación

El proyecto puede considerarse terminado cuando:

- [x] El calendario muestra fechas reales.
- [x] Se puede navegar por cualquier mes y año.
- [x] El día actual se identifica correctamente.
- [x] Se pueden crear eventos.
- [x] Cada evento tiene título.
- [x] Cada evento tiene descripción.
- [x] Cada evento tiene estado.
- [x] Los estados son pendiente/completado.
- [x] Los eventos permanecen después de recargar.
- [x] Los días con eventos poseen un indicador visual.
- [x] Al seleccionar un día se muestran sus eventos.
- [x] Se pueden editar eventos.
- [x] Se pueden eliminar eventos.
- [x] Se puede cambiar su estado.
- [x] Existe una pantalla independiente de estadísticas.
- [x] Se muestran próximos eventos.
- [x] Se muestran eventos pasados.
- [x] Se muestran completados.
- [x] Se identifican pendientes.
- [x] Existe modo claro.
- [x] Existe modo oscuro.
- [x] La preferencia de tema se conserva.
- [x] La aplicación es responsive.
- [x] No existe ninguna dependencia de backend.

---

# 59. Prioridad de implementación

Orden recomendado:

```text
1. Proyecto React
2. Layout
3. Calendario real
4. Navegación mensual
5. Selección de día
6. Modelo de eventos
7. localStorage
8. CRUD
9. Indicadores del calendario
10. Estados
11. Estadísticas
12. Tema claro/oscuro
13. Responsive
14. Accesibilidad
15. Pruebas
16. Pulido visual
```

---

# 60. Resultado final esperado

La aplicación final deberá ofrecer una experiencia similar a:

```text
┌─────────────────────────────────────┐
│ Calendario     Estadísticas     🌙 │
├─────────────────────────────────────┤
│                                     │
│            Octubre 2026             │
│         <               >           │
│                                     │
│ Lun Mar Mié Jue Vie Sáb Dom         │
│              1   2   3   4          │
│  5   6  [7]  8   9  10  11         │
│          ●       ●                  │
│ 12  13  14  15  16  17  18         │
│                                     │
└─────────────────────────────────────┘
```

Al seleccionar un día:

```text
7 de octubre de 2026

2 eventos

┌──────────────────────────┐
│ Revisar proyecto         │
│ Pendiente                │
│                          │
│ Editar | Completar       │
└──────────────────────────┘

┌──────────────────────────┐
│ Comprar materiales       │
│ Completado               │
│                          │
│ Editar | Eliminar        │
└──────────────────────────┘

[ + Crear evento ]
```

La aplicación debe mantenerse deliberadamente sencilla:

```text
React
+
Calendario real
+
Eventos
+
localStorage
+
Estadísticas
+
Modo claro/oscuro
```

Sin backend y sin complejidad innecesaria.
