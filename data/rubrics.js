/* Rúbricas de autoevaluación (1 = inicial, 4 = sólido para el nivel del módulo).
   Son descriptores comprensibles, inspirados en las dimensiones cualitativas
   del MCER (alcance, corrección, fluidez, interacción, coherencia), redactados
   para este curso. No certifican un nivel oficial. */
window.EM = window.EM || {};
EM.rubrics = {
  speaking: [
    { name: 'Fluidez', levels: [
      'Muchas pausas largas; me detuve o cambié al español.',
      'Hablé con pausas frecuentes, pero terminé las ideas principales.',
      'Mantuve el ritmo casi todo el tiempo; pausas breves para pensar.',
      'Hablé el tiempo completo con ritmo natural y usé fillers para ganar tiempo.' ] },
    { name: 'Claridad y comprensibilidad', levels: [
      'Un oyente tendría que adivinar gran parte del mensaje.',
      'Se entiende la idea general con esfuerzo; algunos sonidos confunden.',
      'Se entiende sin esfuerzo; algún sonido o acento de palabra a mejorar.',
      'Pronunciación clara, acento de palabra y de frase correctos casi siempre.' ] },
    { name: 'Precisión gramatical', levels: [
      'Errores en casi todas las frases, incluso en estructuras básicas.',
      'Estructuras básicas correctas; errores en las estructuras objetivo.',
      'Usé la estructura objetivo correctamente la mayoría de las veces.',
      'Usé la estructura objetivo con control y me autocorregí al fallar.' ] },
    { name: 'Vocabulario y expresiones', levels: [
      'Palabras sueltas; no usé las expresiones del módulo.',
      'Usé 1–2 expresiones del módulo; repetí mucho las mismas palabras.',
      'Usé 3–4 expresiones objetivo de forma adecuada.',
      'Usé 5 o más expresiones objetivo con naturalidad y variedad.' ] },
    { name: 'Coherencia', levels: [
      'Ideas sueltas, sin orden.',
      'Orden básico (and, but, then), saltos de idea.',
      'Introducción, desarrollo y cierre; conectores adecuados.',
      'Discurso bien organizado, con ejemplos y conectores variados.' ] },
  ],
  writing: [
    { name: 'Cumplimiento de la tarea', levels: [
      'No respondí a lo que se pedía o falta más de la mitad.',
      'Cubrí parte de los puntos pedidos.',
      'Cubrí todos los puntos con algo de desarrollo.',
      'Cubrí todos los puntos con detalles relevantes y extensión adecuada.' ] },
    { name: 'Organización y coherencia', levels: [
      'Frases sueltas sin orden.',
      'Párrafos o secuencia básica con conectores simples.',
      'Estructura clara con conectores variados.',
      'Texto fluido, párrafos bien construidos, referencias claras.' ] },
    { name: 'Precisión gramatical', levels: [
      'Errores que impiden entender varias frases.',
      'Errores frecuentes, pero el mensaje se entiende.',
      'Pocos errores; estructuras objetivo bien usadas.',
      'Casi sin errores; variedad de estructuras con control.' ] },
    { name: 'Vocabulario', levels: [
      'Vocabulario muy limitado o traducido literalmente.',
      'Vocabulario básico, algunas repeticiones.',
      'Usé expresiones y collocations del módulo.',
      'Vocabulario preciso y variado, collocations naturales.' ] },
    { name: 'Registro y formato', levels: [
      'El tono no corresponde a la situación (ej.: demasiado informal).',
      'Tono mayormente adecuado, con fallos de saludo o cierre.',
      'Tono y formato adecuados (saludo, cierre, cortesía).',
      'Tono, formato y cortesía impecables para el lector previsto.' ] },
  ],
  interaction: [
    { name: 'Responder y reaccionar', levels: [
      'Respondí con palabras sueltas o no respondí.',
      'Respondí con frases cortas sin reaccionar a lo dicho.',
      'Respondí y reaccioné (Really? That makes sense…).',
      'Respondí, reaccioné y añadí información o una pregunta de vuelta.' ] },
    { name: 'Gestionar la conversación', levels: [
      'No pude pedir aclaraciones ni reformular.',
      'Pedí que repitieran, pero no reformulé.',
      'Pedí aclaraciones y reformulé con mis palabras.',
      'Pedí aclaraciones, reformulé, comprobé comprensión y reconduje la charla.' ] },
    { name: 'Fluidez', levels: [
      'Silencios largos.',
      'Pausas frecuentes.',
      'Ritmo aceptable con pausas breves.',
      'Ritmo natural; usé fillers y frases de transición.' ] },
    { name: 'Precisión y vocabulario', levels: [
      'Errores básicos constantes.',
      'Errores frecuentes, mensaje comprensible.',
      'Errores ocasionales; vocabulario adecuado.',
      'Lenguaje preciso y variado para el nivel.' ] },
  ],
};
