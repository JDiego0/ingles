# Seguimiento de construcción — English Mastery

Documento de control: qué está completo, qué falta y qué pruebas se ejecutaron.
Un módulo solo figura como **completo** cuando tiene todas sus lecciones con materiales reales y pasa `node tests/validate.mjs <id>`.

## Motor de la aplicación

| Componente | Estado |
|---|---|
| Router, carga de módulos bajo demanda, tema claro/oscuro, tamaño de letra | ✔ |
| Service worker (red primero, revalidación, caché de respaldo) + manifest | ✔ |
| Almacenamiento local versionado, migración, export/import JSON, sincronización entre pestañas | ✔ probado |
| Ejercicios: opción múltiple, completar, ordenar con fichas táctiles, reescribir/traducir/corregir, ítems de escucha | ✔ probado |
| Lección A–K con requisitos de finalización (≥ 80 % + speaking autoevaluado) | ✔ probado |
| Consolidación semanal, evaluación de módulo (también como prueba de salto), exámenes de etapa, diagnóstico con plan de nivelación | ✔ probado |
| Repaso espaciado (cajas 0–7, límites diarios, olvidadas/dudosas, favoritas) | ✔ probado |
| Vocabulario (mis tarjetas, todo el curso, propias; estados aprendida/dudosa/pendiente) | ✔ probado |
| Banco de errores con reutilización obligatoria | ✔ probado |
| Texto a voz con detección, selección de voz, velocidad, variedades (en-GB/AU/IN si existen) | ✔ (audibilidad no verificada) |
| Grabadora, cuenta atrás, rúbricas de autoevaluación | ✔ (micrófono no verificado en dispositivo real) |
| Temporizador de sesión con agenda, persistente | ✔ probado |
| Inicio con datos reales (racha, minutos, repasos, habilidades), historial y comparación de diagnósticos | ✔ |

## Módulos

| Módulo | Estado | Validador |
|---|---|---|
| M00 Start Here (2 lecciones) | ✔ completo | ✔ |
| M01–M04 (Etapa 1, A1+) | ✔ completos | ✔ |
| M05–M09 (Etapa 2, A2) | ✔ completos | ✔ |
| M10–M13 (Etapa 3, B1) | ✔ completos | ✔ |
| M14–M16 (Etapa 4, B1+/B2) | ✔ completos | ✔ |
| M17–M18 (Etapa 5, C1) | ✔ completos | ✔ |
| M19 Integración y evaluación final (3 lecciones) | ✔ completo | ✔ |
| Diagnóstico, banco de speaking, guía de pronunciación, rúbricas, ayuda | ✔ | ✔ |

## Pendiente / mejoras posibles

- Probar en un Android físico (audio, micrófono, descarga, instalación). Ver `tests/validation.md` §4.
- Publicar en GitHub Pages (lo hace el propietario; instrucciones en el README).
- Posibles ampliaciones: más lecturas extensivas por etapa, audio grabado por personas reales (si se dispone de grabaciones con licencia), segunda vuelta “Ciclo 2” con tareas más largas.

## Pruebas ejecutadas

Ver `tests/validation.md`.
