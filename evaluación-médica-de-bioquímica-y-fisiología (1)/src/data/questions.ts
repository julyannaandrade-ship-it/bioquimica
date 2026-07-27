import { Question, QuizBlock, StudentAttempt } from '../types';

export const QUIZ_BLOCKS: QuizBlock[] = [
  {
    id: 1,
    title: 'Bloque 1: Digestión de Proteínas y Dinámica Intestinal',
    description: 'Aclorhidria, enteropeptidasa, cotransporte de Na+, metabolismo del enterocito y folatos.',
    iconName: 'Dna',
    questionCount: 5,
  },
  {
    id: 2,
    title: 'Bloque 2: Transporte de Amoníaco y Ciclo de la Urea',
    description: 'Ciclo de Cahill, glutamina renal, CPS-I, N-acetilglutamato, biciclo de Krebs y toxicidad por amoníaco.',
    iconName: 'RefreshCw',
    questionCount: 6,
  },
  {
    id: 3,
    title: 'Bloque 3: Catabolismo de Aminoácidos y Destinos de Carbono',
    description: 'Aminoácidos cetogénicos, PLP (Vit B6), GDH, cortisol, dietas hiperproteicas y BCAA.',
    iconName: 'Scale',
    questionCount: 7,
  },
  {
    id: 4,
    title: 'Bloque 4: Homeostasis del Hierro y Anemias',
    description: 'Absorción de Fe, omeprazol, ferroportina, transferrina, hepcidina, IRP/IRE y anemia inflamatoria.',
    iconName: 'Activity',
    questionCount: 6,
  },
  {
    id: 5,
    title: 'Bloque 5: ALAS 1 y ALAS 2 (Enzimas Marcapasos del Hemo)',
    description: 'Isoformas ALAS, hemina/feedback, Vitamina B6, sideroblastos en anillo, saturnismo y ferroquelatasa.',
    iconName: 'Settings',
    questionCount: 6,
  },
];

export const QUESTIONS: Question[] = [
  // --- BLOQUE 1 ---
  {
    id: 1,
    blockId: 1,
    blockTitle: 'Bloque 1: Digestión de Proteínas y Dinámica Intestinal',
    questionNumber: 1,
    questionText: 'En un paciente con aclorhidria severa (ausencia de ácido clorhídrico), la digestión de proteínas de la dieta se ve fuertemente afectada. ¿Cuáles son las dos funciones fisiológicas exclusivas del HCl gástrico que fallan en este cuadro?',
    options: [
      { letter: 'A', text: 'Hidrólisis de los enlaces peptídicos internos y activación de la enteropeptidasa.' },
      { letter: 'B', text: 'Emulsificación de las proteínas globulares y secreción de factor intrínseco.' },
      { letter: 'C', text: 'Desnaturalización de la estructura tridimensional proteica y activación autocatalítica del pepsinógeno.' },
      { letter: 'D', text: 'Estimulación directa de los zimógenos pancreáticos en el duodeno.' }
    ],
    correctAnswer: 'C',
    explanation: 'El pH extremadamente bajo generado por el HCl rompe las interacciones no covalentes de las proteínas (desnaturalización) para exponer los enlaces a la acción enzimática. Además, este ambiente ácido induce un cambio conformacional para que el pepsinógeno inactivo se escinda a sí mismo y se convierta en pepsina activa (activación autocatalítica).',
    tags: ['Aclorhidria', 'HCl', 'Pepsinógeno', 'Pepsina', 'Estómago'],
    difficulty: 'Medio'
  },
  {
    id: 2,
    blockId: 1,
    blockTitle: 'Bloque 1: Digestión de Proteínas y Dinámica Intestinal',
    questionNumber: 2,
    questionText: 'Una mutación congénita inactiva la enzima enteropeptidasa (enterocinasa) en las microvellosidades intestinales, provocando desnutrición proteica grave. ¿Cuál es el mecanismo bioquímico directo de esta falla?',
    options: [
      { letter: 'A', text: 'Impide la absorción de los aminoácidos libres por el transportador de sodio.' },
      { letter: 'B', text: 'Detiene la conversión de tripsinógeno a tripsina, bloqueando en cascada la activación de todos los demás zimógenos pancreáticos.' },
      { letter: 'C', text: 'Inhibe la secreción de ácido gástrico en el estómago.' },
      { letter: 'D', text: 'Frena la acción de la pepsina al neutralizar el pH del quimo.' }
    ],
    correctAnswer: 'B',
    explanation: 'La enteropeptidasa tiene el rol exclusivo de escindir el tripsinógeno para transformarlo en tripsina activa; a su vez, la tripsina es indispensable para activar en cascada al quimotripsinógeno, proelastasa y procarboxipeptidasas, siendo el "interruptor maestro" de la digestión pancreática.',
    tags: ['Enteropeptidasa', 'Tripsinógeno', 'Tripsina', 'Zimógenos pancreáticos'],
    difficulty: 'Medio'
  },
  {
    id: 3,
    blockId: 1,
    blockTitle: 'Bloque 1: Digestión de Proteínas y Dinámica Intestinal',
    questionNumber: 3,
    questionText: 'El ingreso de monosacáridos como la glucosa y de los aminoácidos libres a través de la membrana luminal del enterocito comparten un mecanismo bioenergético estricto. ¿Cuál es?',
    options: [
      { letter: 'A', text: 'Ingresan a favor de gradiente de concentración por difusión pasiva.' },
      { letter: 'B', text: 'Utilizan endocitosis mediada por clatrina.' },
      { letter: 'C', text: 'Dependen del cotransporte activo secundario acoplado al ingreso de Sodio (\\(Na^+\\)).' },
      { letter: 'D', text: 'Ingresan por bombas primarias con hidrólisis directa de ATP en la membrana apical.' }
    ],
    correctAnswer: 'C',
    explanation: 'Tanto la glucosa (mediante SGLT-1) como los aminoácidos ingresan al enterocito por cotransporte activo secundario acoplado a sodio. Este gradiente es mantenido a expensas de la bomba \\(Na^+/K^+\\)-ATPasa ubicada en la membrana basolateral.',
    tags: ['Absorción Intestinal', 'Na+/K+-ATPasa', 'SGLT-1', 'Cotransporte Activo'],
    difficulty: 'Fácil'
  },
  {
    id: 4,
    blockId: 1,
    blockTitle: 'Bloque 1: Digestión de Proteínas y Dinámica Intestinal',
    questionNumber: 4,
    questionText: 'A diferencia de los tejidos glucodependientes obligados, las células epiteliales del intestino delgado (enterocitos) utilizan de forma primaria un sustrato diferente para producir ATP y sostener su alto recambio. ¿Cuál es este combustible?',
    options: [
      { letter: 'A', text: 'Ácidos grasos de cadena corta.' },
      { letter: 'B', text: 'Cuerpos cetónicos.' },
      { letter: 'C', text: 'Glucosa proveniente del hígado.' },
      { letter: 'D', text: 'Glutamina (y aspartato).' }
    ],
    correctAnswer: 'D',
    explanation: 'El enterocito está adaptado metabólicamente para oxidar aminoácidos, fundamentalmente la glutamina, como su combustible prioritario para generar ATP. Esto permite que la glucosa absorbida de la dieta sea "ahorrada" y llegue intacta al torrente sanguíneo portal.',
    tags: ['Enterocito', 'Glutamina', 'Metabolismo Energético Intestinal'],
    difficulty: 'Avanzado'
  },
  {
    id: 5,
    blockId: 1,
    blockTitle: 'Bloque 1: Digestión de Proteínas y Dinámica Intestinal',
    questionNumber: 5,
    questionText: 'Un paciente vegetariano estricto cursa con deficiencia crónica de Ácido Fólico (Vitamina B9). Entre sus síntomas se halla una malabsorción por atrofia severa de la mucosa intestinal. Esto se explica bioquímicamente porque la falta de tetrahidrofolato:',
    options: [
      { letter: 'A', text: 'Inhibe directamente la actividad de las disacaridasas.' },
      { letter: 'B', text: 'Impide la transaminación de los aminoácidos absorbidos.' },
      { letter: 'C', text: 'Frena la síntesis celular de nucleótidos (purinas y dTMP), impidiendo la mitosis y el recambio de los enterocitos en las criptas.' },
      { letter: 'D', text: 'Destruye las uniones estrechas (tight junctions) entre enterocitos.' }
    ],
    correctAnswer: 'C',
    explanation: 'El ácido fólico es el donante indispensable de fragmentos monocarbonados para la síntesis de novo de bases purinas y dTMP; al faltar, las células de alta replicación como la mucosa intestinal y médula ósea frenan su división celular, llevando a la atrofia del tejido.',
    tags: ['Ácido Fólico', 'Vitamina B9', 'Tetrahidrofolato', 'Mitosis Mucosa'],
    difficulty: 'Avanzado'
  },

  // --- BLOQUE 2 ---
  {
    id: 6,
    blockId: 2,
    blockTitle: 'Bloque 2: Transporte de Amoníaco y Ciclo de la Urea',
    questionNumber: 6,
    questionText: 'Durante el ejercicio intenso, el músculo transporta de forma segura el nitrógeno proveniente del catabolismo de aminoácidos hacia el hígado mediante el "Ciclo de Cahill" o ciclo de la Glucosa-Alanina. ¿De qué sustrato deriva el esqueleto carbonado de este transportador?',
    options: [
      { letter: 'A', text: 'Del oxaloacetato generado en el ciclo de Krebs.' },
      { letter: 'B', text: 'De la transaminación del piruvato producido por la glucólisis muscular.' },
      { letter: 'C', text: 'Del glicerol liberado por la lipasa sensible a hormonas.' },
      { letter: 'D', text: 'De los cuerpos cetónicos.' }
    ],
    correctAnswer: 'B',
    explanation: 'En el músculo, la alta tasa glucolítica rinde piruvato; a través de la enzima ALAT, el piruvato recibe el grupo amino convirtiéndose en alanina, la cual viaja por sangre al hígado para ceder su nitrógeno y reciclar su carbono hacia nueva glucosa.',
    tags: ['Ciclo de Cahill', 'Alanina', 'Piruvato', 'ALAT', 'Músculo-Hígado'],
    difficulty: 'Medio'
  },
  {
    id: 7,
    blockId: 2,
    blockTitle: 'Bloque 2: Transporte de Amoníaco y Ciclo de la Urea',
    questionNumber: 7,
    questionText: 'Ante un cuadro de cetoacidosis diabética severa, las células del túbulo renal aumentan exponencialmente la captación y catabolismo de glutamina plasmática. El objetivo clínico y metabólico primario de esta adaptación es:',
    options: [
      { letter: 'A', text: 'Generar más glucosa a través de la gluconeogénesis renal para nutrir al miocardio.' },
      { letter: 'B', text: 'Disminuir los niveles de amoníaco cerebral.' },
      { letter: 'C', text: 'Liberar amoníaco libre (\\(NH_3\\)) a la luz urinaria para que atrape protones (\\(H^+\\)) como ion amonio (\\(NH_4^+\\)), amortiguando eficazmente la acidez sanguínea.' },
      { letter: 'D', text: 'Formar urea de manera local en los riñones.' }
    ],
    correctAnswer: 'C',
    explanation: 'La enzima glutaminasa renal hidroliza la glutamina, liberando \\(NH_3\\) a la luz tubular. Este \\(NH_3\\) atrapa los protones ácidos excretados formando ion amonio (\\(NH_4^+\\)), el cual se elimina en orina, elevando así el pH sistémico para compensar la acidosis metabólica.',
    tags: ['Cetoacidosis', 'Glutaminasa Renal', 'Amonio', 'Equilibrio Ácido-Base'],
    difficulty: 'Avanzado'
  },
  {
    id: 8,
    blockId: 2,
    blockTitle: 'Bloque 2: Transporte de Amoníaco y Ciclo de la Urea',
    questionNumber: 8,
    questionText: 'En la evaluación de un recién nacido con un cuadro letal de hiperamonemia, se documenta inactividad de la Carbamoil Fosfato Sintetasa I (CPS-I). A nivel molecular, esta enzima clave mitocondrial es completamente inoperante en ausencia de su activador alostérico obligatorio, el cual es:',
    options: [
      { letter: 'A', text: 'ATP citosólico.' },
      { letter: 'B', text: 'Fumarato.' },
      { letter: 'C', text: 'Arginina.' },
      { letter: 'D', text: 'N-acetilglutamato (NAG).' }
    ],
    correctAnswer: 'D',
    explanation: 'La enzima CPS-I tiene una dependencia absoluta del N-acetilglutamato para adoptar su conformación activa. El NAG aumenta cuando la disponibilidad de aminoácidos es alta, actuando como un sensor metabólico para encender el Ciclo de la Urea.',
    tags: ['CPS-I', 'N-acetilglutamato', 'NAG', 'Hiperamonemia', 'Ciclo de la Urea'],
    difficulty: 'Medio'
  },
  {
    id: 9,
    blockId: 2,
    blockTitle: 'Bloque 2: Transporte de Amoníaco y Ciclo de la Urea',
    questionNumber: 9,
    questionText: 'La biosíntesis de urea es un proceso metabólico costoso que consume energía. Sin embargo, "recupera" parte del gasto conectando sus vías con el ciclo de Krebs mediante el "Biciclo de Krebs". Esta interconexión se da exclusivamente cuando en el citosol se escinde el argininosuccinato liberando un intermediario carbonado. ¿Cuál es?',
    options: [
      { letter: 'A', text: 'Fumarato.' },
      { letter: 'B', text: 'Malato.' },
      { letter: 'C', text: 'Succinil-CoA.' },
      { letter: 'D', text: 'Oxaloacetato.' }
    ],
    correctAnswer: 'A',
    explanation: 'En el tercer paso del ciclo de la urea en el citosol hepático, el argininosuccinato es escindido formando arginina y fumarato. Este fumarato puede ingresar a la mitocondria y reincorporarse al ciclo de Krebs para rendir energía.',
    tags: ['Biciclo de Krebs', 'Argininosuccinato', 'Fumarato', 'Ciclo de la Urea'],
    difficulty: 'Avanzado'
  },
  {
    id: 10,
    blockId: 2,
    blockTitle: 'Bloque 2: Transporte de Amoníaco y Ciclo de la Urea',
    questionNumber: 10,
    questionText: 'En una insuficiencia hepática crónica terminal, el amoníaco se acumula y cruza la barrera hematoencefálica induciendo encefalopatía hepática y coma. ¿Qué mecanismo bioquímico astrocitario paraliza la producción de energía neuronal?',
    options: [
      { letter: 'A', text: 'La inhibición irreversible de los receptores GLUT3 por el amoníaco.' },
      { letter: 'B', text: 'El amoníaco bloquea directamente al complejo IV de la cadena respiratoria.' },
      { letter: 'C', text: 'La sobreactivación frenética de la glutamina sintetasa consume masivamente glutamato y agota el \\(\\alpha\\)-cetoglutarato mitocondrial, interrumpiendo el flujo del Ciclo de Krebs.' },
      { letter: 'D', text: 'El amoníaco destruye el ARN mitocondrial de los astrocitos.' }
    ],
    correctAnswer: 'C',
    explanation: 'Ante la intoxicación por amoníaco, el astrocito fuerza la detoxificación formando glutamina; para ello depletando el \\(\\alpha\\)-cetoglutarato del medio, lo que detiene irreversiblemente el ciclo de Krebs celular causando caída de ATP y daño osmótico.',
    tags: ['Encefalopatía Hepática', 'Astrocitos', 'α-cetoglutarato', 'Glutamina Sintetasa'],
    difficulty: 'Avanzado'
  },
  {
    id: 11,
    blockId: 2,
    blockTitle: 'Bloque 2: Transporte de Amoníaco y Ciclo de la Urea',
    questionNumber: 11,
    questionText: 'La molécula final de urea excretada en orina concentra dos átomos de nitrógeno altamente tóxicos. Durante el ciclo hepático, estos dos nitrógenos provienen estructuralmente de:',
    options: [
      { letter: 'A', text: 'Dos moléculas de glutamina desaminadas.' },
      { letter: 'B', text: 'Amoníaco libre (\\(NH_4^+\\)) mitocondrial aportado por la GDH y del aminoácido aspartato en el citosol.' },
      { letter: 'C', text: 'Amoníaco libre y Ornitina.' },
      { letter: 'D', text: 'Alanina citosólica y Citrulina.' }
    ],
    correctAnswer: 'B',
    explanation: 'El primer nitrógeno ingresa a la mitocondria fijado por la CPS-I como amoníaco libre (\\(NH_4^+\\)); el segundo nitrógeno ingresa de forma intacta directamente desde el aminoácido aspartato al condensarse con la citrulina en el citosol.',
    tags: ['Urea', 'Origen de Nitrógenos', 'Aspartato', 'GDH'],
    difficulty: 'Medio'
  },

  // --- BLOQUE 3 ---
  {
    id: 12,
    blockId: 3,
    blockTitle: 'Bloque 3: Catabolismo de Aminoácidos y Destinos de Carbono',
    questionNumber: 12,
    questionText: 'Durante la inanición prolongada, el hígado cataboliza los esqueletos carbonados de los aminoácidos para convertirlos en sustrato gluconeogénico o cuerpos cetónicos. Metabólicamente, ¿cuáles son los únicos dos aminoácidos que rinden exclusivamente acetil-CoA o acetoacetato (cetogénicos) y jamás pueden aportar carbonos netos para formar nueva glucosa?',
    options: [
      { letter: 'A', text: 'Tirosina y Triptófano.' },
      { letter: 'B', text: 'Leucina y Lisina.' },
      { letter: 'C', text: 'Alanina y Glutamina.' },
      { letter: 'D', text: 'Valina e Isoleucina.' }
    ],
    correctAnswer: 'B',
    explanation: 'La Leucina y la Lisina son exclusivamente cetogénicas. En el metabolismo de mamíferos, el acetil-CoA no puede regresar a piruvato y sus carbonos se pierden inexorablemente como \\(CO_2\\) en el ciclo de Krebs, anulando toda posibilidad de formar glucosa a partir de ellos.',
    tags: ['Leucina', 'Lisina', 'Cetogénicos', 'Gluconeogénesis'],
    difficulty: 'Fácil'
  },
  {
    id: 13,
    blockId: 3,
    blockTitle: 'Bloque 3: Catabolismo de Aminoácidos y Destinos de Carbono',
    questionNumber: 13,
    questionText: 'Las enzimas aminotransferasas (como la ALAT y la ASAT) se encargan de remover el grupo amino del esqueleto carbonado de los aminoácidos. A nivel molecular, la catálisis exige la presencia estricta de una coenzima capaz de aceptar de forma transitoria dicho grupo. ¿Cuál es?',
    options: [
      { letter: 'A', text: 'Tiamina Pirofosfato (TPP).' },
      { letter: 'B', text: 'Tetrahidrofolato.' },
      { letter: 'C', text: 'FAD.' },
      { letter: 'D', text: 'Fosfato de piridoxal (PLP / derivado de Vitamina B6).' }
    ],
    correctAnswer: 'D',
    explanation: 'El Fosfato de Piridoxal (PLP) actúa como "transbordador" temporal en el sitio activo de las transaminasas, captando el \\(\\alpha\\)-amino para formar piridoxamina fosfato y cederlo subsecuentemente al \\(\\alpha\\)-cetoácido aceptor.',
    tags: ['Transaminasas', 'PLP', 'Vitamina B6', 'ALAT', 'ASAT'],
    difficulty: 'Fácil'
  },
  {
    id: 14,
    blockId: 3,
    blockTitle: 'Bloque 3: Catabolismo de Aminoácidos y Destinos de Carbono',
    questionNumber: 14,
    questionText: 'La desaminación oxidativa en el hígado, que provee el amoníaco tóxico directo al ciclo de la urea, está catalizada por la enzima mitocondrial Glutamato Deshidrogenasa (GDH). ¿Cuál es la regulación alostérica que modula el ritmo de esta enzima según las necesidades celulares?',
    options: [
      { letter: 'A', text: 'Inhibición irreversible por niveles altos de insulina posprandial.' },
      { letter: 'B', text: 'Inhibición alostérica por altas cargas energéticas (ATP y GTP) y activación por indicadores de baja energía (ADP).' },
      { letter: 'C', text: 'Activación exclusiva mediada por modificación covalente por el glucagón y el AMPc.' },
      { letter: 'D', text: 'Activación por niveles altos de NADH citosólico.' }
    ],
    correctAnswer: 'B',
    explanation: 'La GDH funciona como un sensor energético. Cuando sobra energía (ATP/GTP altos), la enzima se inhibe alostéricamente; cuando el organismo necesita reciclar esqueletos carbonados para el ciclo de Krebs (alto ADP), la enzima se activa.',
    tags: ['Glutamato Deshidrogenasa', 'GDH', 'Regulación Alostérica', 'ADP/ATP'],
    difficulty: 'Medio'
  },
  {
    id: 15,
    blockId: 3,
    blockTitle: 'Bloque 3: Catabolismo de Aminoácidos y Destinos de Carbono',
    questionNumber: 15,
    questionText: 'Un paciente víctima de grandes quemaduras ingresa a Terapia Intensiva cursando una respuesta inflamatoria sistémica severa. Desarrolla un marcado balance nitrogenado negativo y pérdida acelerada de masa muscular esquelética. ¿Qué hormona contra-reguladora del estrés dicta predominantemente esta lisis proteica masiva?',
    options: [
      { letter: 'A', text: 'Hormona de crecimiento (GH).' },
      { letter: 'B', text: 'Aldosterona.' },
      { letter: 'C', text: 'Cortisol.' },
      { letter: 'D', text: 'Tiroxina libre.' }
    ],
    correctAnswer: 'C',
    explanation: 'El Cortisol, liberado masivamente en condiciones de hipercatabolismo crónico o sepsis, induce transcripcionalmente la degradación de proteínas fibrilares del músculo para bombear un flujo continuo de sustratos gluconeogénicos y de síntesis aguda al hígado, generando un balance proteico negativo profundo.',
    tags: ['Cortisol', 'Proteólocis Muscular', 'Hipercatabolismo', 'Estrés'],
    difficulty: 'Fácil'
  },
  {
    id: 16,
    blockId: 3,
    blockTitle: 'Bloque 3: Catabolismo de Aminoácidos y Destinos de Carbono',
    questionNumber: 16,
    questionText: 'Un paciente decide comenzar una dieta restringida 100% en hidratos de carbono, alimentándose únicamente a expensas de lípidos y proteínas magras. A pesar de no ingresar glucosa, mantiene una glucemia constante normal. A nivel hepático, ¿qué escenario metabólico es predecible?',
    options: [
      { letter: 'A', text: 'Alta secreción de insulina con supresión de la degradación proteica y formación exclusiva de VLDL.' },
      { letter: 'B', text: 'Un aumento sostenido del glucagón que fuerza la gluconeogénesis usando como precursores a los esqueletos carbonados de los aminoácidos dietarios, acompañado de alta excreción de urea.' },
      { letter: 'C', text: 'Estimulación masiva del ciclo de Cori a partir de los cuerpos cetónicos.' },
      { letter: 'D', text: 'Hipoglucemia persistente amortiguada por la vía de las pentosas de manera exclusiva.' }
    ],
    correctAnswer: 'B',
    explanation: 'La privación aguda de carbohidratos eleva el cociente glucagón/insulina. El glucagón hepático estimula potentemente la gluconeogénesis extrayendo los carbonos de los aminoácidos glucogénicos circulantes. Esto obliga al hígado a deshacerse exponencialmente de los grupos amino sobrantes, triplicando la síntesis y secreción de urea.',
    tags: ['Dieta Cetogénica', 'Gluconeogénesis', 'Glucagón', 'Excreción de Urea'],
    difficulty: 'Medio'
  },
  {
    id: 17,
    blockId: 3,
    blockTitle: 'Bloque 3: Catabolismo de Aminoácidos y Destinos de Carbono',
    questionNumber: 17,
    questionText: 'En estado posprandial o de saciedad, la enzima ALAT cataliza la reacción (Alanina + \\(\\alpha\\)-cetoglutarato \\(\\leftrightarrow\\) Piruvato + Glutamato) en el hepatocito. ¿Hacia dónde se dirige obligatoriamente el producto metabólico "Piruvato" bajo el dominio de altas concentraciones de Insulina?',
    options: [
      { letter: 'A', text: 'Se envía como precursor a la gluconeogénesis hepática para almacenar glucógeno extrahepático.' },
      { letter: 'B', text: 'Se transamina nuevamente en glutamina libre para ser exportada a los tejidos como amoníaco.' },
      { letter: 'C', text: 'Ingresa a la mitocondria, es descarboxilado por el complejo PDH activado hacia Acetil-CoA y desviado al citosol para la lipogénesis de novo (síntesis de ácidos grasos).' },
      { letter: 'D', text: 'Se convierte directamente en cuerpos cetónicos mediante la tiolasa de forma irreversible.' }
    ],
    correctAnswer: 'C',
    explanation: 'En estado de saciedad (insulina), la gluconeogénesis está transcripcional e irreversiblemente inhibida. El piruvato formado a partir del catabolismo proteico postprandial es forzado a transformarse en Acetil-CoA e ingresar al anabolismo lipídico, promoviendo el depósito de grasa (TAG).',
    tags: ['Insulina', 'Piruvato Deshidrogenasa', 'Lipogénesis', 'Estado Posprandial'],
    difficulty: 'Avanzado'
  },
  {
    id: 18,
    blockId: 3,
    blockTitle: 'Bloque 3: Catabolismo de Aminoácidos y Destinos de Carbono',
    questionNumber: 18,
    questionText: 'Tras el proceso posprandial temprano del intestino a la vena porta, una clase específica de aminoácidos elude sistemáticamente el catabolismo hepático y fluye "intacta" por la sangre general hacia el músculo esquelético. ¿Cuáles son y por qué el hígado es incapaz de utilizarlos masivamente?',
    options: [
      { letter: 'A', text: 'La glicina y la alanina, porque el hígado las reserva solo para el ciclo de Cori.' },
      { letter: 'B', text: 'Los Aminoácidos de Cadena Ramificada (Valina, Leucina, Isoleucina - BCAA), debido a que el hepatocito posee niveles notablemente bajos o ausentes de la enzima aminotransferasa de BCAA.' },
      { letter: 'C', text: 'El glutamato y el aspartato, porque sus cargas ácidas impiden su cruce por la membrana sinusoidal.' },
      { letter: 'D', text: 'Exclusivamente la prolina, porque su estructura anular cíclica resiste el metabolismo microsomal.' }
    ],
    correctAnswer: 'B',
    explanation: 'Los BCAA escapan en su gran mayoría de la captura y depuración hepática porque el hígado carece de la concentración enzimática limitante (aminotransferasas de cadena ramificada), derivándose al músculo estriado, donde sí residen grandes cantidades de estas enzimas para su aprovechamiento proteico y energético.',
    tags: ['BCAA', 'Cadena Ramificada', 'Músculo', 'Metabolismo Hepático'],
    difficulty: 'Medio'
  },

  // --- BLOQUE 4 ---
  {
    id: 19,
    blockId: 4,
    blockTitle: 'Bloque 4: Homeostasis del Hierro y Anemias',
    questionNumber: 19,
    questionText: 'Un paciente diagnosticado con enfermedad de reflujo es tratado crónicamente con Omeprazol, una medicación que suprime drásticamente la secreción del ácido gástrico. Al cabo de los meses desarrolla anemia. Al ingerir hierro no hemínico (espinaca), ¿cuál es el obstáculo molecular para su correcta asimilación?',
    options: [
      { letter: 'A', text: 'La ausencia de un ambiente estomacal ácido impide que el hierro férrico (\\(Fe^{3+}\\)) se reduzca al estado ferroso (\\(Fe^{2+}\\)), el cual es la única forma oxidativa aceptada por el transportador DMT-1 luminal.' },
      { letter: 'B', text: 'El pH alcalino inactiva de forma directa a la enzima ferroportina en el polo basolateral.' },
      { letter: 'C', text: 'El hierro no hemínico necesita proteasas alcalinas para desligarse de la clorofila vegetal, y la acidez las inactiva.' },
      { letter: 'D', text: 'La aclorhidria promueve la destrucción masiva de transferrina plasmática.' }
    ],
    correctAnswer: 'A',
    explanation: 'El hierro vegetal o inorgánico (no hemo) se halla primariamente oxidado como \\(Fe^{3+}\\). Para ser absorbido, la acidez gástrica (y la vitamina C del borde en cepillo) es indispensable para reducirlo a \\(Fe^{2+}\\), el sustrato específico del cotransportador apical DMT-1 del enterocito.',
    tags: ['Hierro No Hemínico', 'Fe3+ a Fe2+', 'DMT-1', 'Omeprazol', 'Acidez Gástrica'],
    difficulty: 'Medio'
  },
  {
    id: 20,
    blockId: 4,
    blockTitle: 'Bloque 4: Homeostasis del Hierro y Anemias',
    questionNumber: 20,
    questionText: 'Fisiológicamente, el organismo transfiere el hierro absorbido desde el polo basolateral del enterocito hacia el plasma sanguíneo, garantizando que fluya seguro y soluble. ¿Qué proteína actúa como "puerta de salida" celular y qué proteína asume su acarreo sistémico?',
    options: [
      { letter: 'A', text: 'Sale por Endocitosis, viaja unida a Ceruloplasmina.' },
      { letter: 'B', text: 'Sale a través del canal transmembrana Ferroportina, donde sufre una reoxidación a \\(Fe^{3+}\\) para viajar estrechamente unida a la Transferrina.' },
      { letter: 'C', text: 'Es expulsado por la bomba DMT-1 y viaja por sangre conjugado de manera libre a los hematíes.' },
      { letter: 'D', text: 'Egresa acoplado a Hepcidina y se transporta ensamblado a la Albúmina.' }
    ],
    correctAnswer: 'B',
    explanation: 'El \\(Fe^{2+}\\) atraviesa la membrana basocelular por la proteína efluyente Ferroportina. Ya en el torrente sanguíneo, es reoxidado rápidamente para poder fijarse con altísima afinidad a la Transferrina.',
    tags: ['Ferroportina', 'Transferrina', 'Transporte de Hierro'],
    difficulty: 'Fácil'
  },
  {
    id: 21,
    blockId: 4,
    blockTitle: 'Bloque 4: Homeostasis del Hierro y Anemias',
    questionNumber: 21,
    questionText: 'El organismo carece de mecanismos eficientes y activos para la excreción de excesos patológicos de hierro. Por lo tanto, ejerce todo el control maestro suprimiendo su absorción intestinal. Esta "clausura" de entrada está comandada por el hígado mediante la hormona:',
    options: [
      { letter: 'A', text: 'Insulina, que bloquea el metabolismo del DMT-1.' },
      { letter: 'B', text: 'Bilirrubina indirecta.' },
      { letter: 'C', text: 'Ferritina circulante, que se une a receptores renales de hierro para su excreción urinaria masiva.' },
      { letter: 'D', text: 'Hepcidina, la cual viaja al intestino y se acopla a la ferroportina forzando su internalización y degradación lisosómica, dejando el hierro "atrapado" en el enterocito.' }
    ],
    correctAnswer: 'D',
    explanation: 'La hepcidina hepática actúa directamente eliminando a las moléculas de ferroportina de la membrana de macrófagos y enterocitos, impidiendo la cesión del hierro al plasma.',
    tags: ['Hepcidina', 'Ferroportina', 'Regulación del Hierro'],
    difficulty: 'Medio'
  },
  {
    id: 22,
    blockId: 4,
    blockTitle: 'Bloque 4: Homeostasis del Hierro y Anemias',
    questionNumber: 22,
    questionText: 'En una Anemia Ferropénica franca por deficiencia dietética crónica, el hepatograma y perfil férrico del paciente manifestará característicamente:',
    options: [
      { letter: 'A', text: 'Elevada ferritina tisular, elevada transferrina circulante y saturación superior al 55%.' },
      { letter: 'B', text: 'Baja ferritina (por el vaciamiento extremo de los depósitos corporales), alta concentración de Transferrina plasmática (mecanismo hepático de compensación desesperado) y una bajísima saturación de transferrina (ej. < 15%).' },
      { letter: 'C', text: 'Aumento de la capacidad de saturación de hierro total y ferritina fuertemente incrementada como reactante agudo.' },
      { letter: 'D', text: 'Niveles muy bajos de Transferrina, pues su gen se inactiva ante la carencia férrica, acompañada de elevación del hierro plasmático libre.' }
    ],
    correctAnswer: 'B',
    explanation: 'La ferritina sérica desciende precozmente como indicador directo del agotamiento de las reservas intracelulares de hierro; en compensación hiperactiva, se sobre-sintetiza transferrina para tratar de cazar las exiguas trazas de hierro remanente, diluyendo la proporción saturada del transporte.',
    tags: ['Anemia Ferropénica', 'Ferritina', 'Transferrina', 'Saturación'],
    difficulty: 'Medio'
  },
  {
    id: 23,
    blockId: 4,
    blockTitle: 'Bloque 4: Homeostasis del Hierro y Anemias',
    questionNumber: 23,
    questionText: 'Cuando el nivel intracelular de hierro celular disminuye severamente, unas estructuras denominadas Proteínas Reguladoras de Hierro (IRP) se adhieren firmemente a las secuencias IRE (Elementos de Respuesta al Hierro) localizadas en el extremo 5\' del ARNm de la Ferritina. El efecto de esta unión es:',
    options: [
      { letter: 'A', text: 'Potenciar agudamente su traducción ribosomal, duplicando los gránulos de hemosiderina para prevenir estrés oxidativo celular.' },
      { letter: 'B', text: 'Escindir de forma nucleolítica el ARNm del receptor de transferrina (TfR1).' },
      { letter: 'C', text: 'Bloquear estéricamente y deprimir la traducción del ARNm de la Ferritina, evitando sintetizar inútilmente depósitos intracelulares cuando el hierro es escaso y urgente para los procesos biosintéticos.' },
      { letter: 'D', text: 'Convertir a la ferritina en una enzima proteolítica lisosomal citosólica.' }
    ],
    correctAnswer: 'C',
    explanation: 'Es una regulación traduccional protectora. Ante la escasez de Fe, el poco mineral que ingresa debe destinarse al recambio enzimático metabólico inmediato; frenar su depósito en ferritina evita el almacenamiento de la deficiencia y propicia el uso directo.',
    tags: ['IRP', 'IRE', 'Ferritina', 'Regulación Traduccional'],
    difficulty: 'Avanzado'
  },
  {
    id: 24,
    blockId: 4,
    blockTitle: 'Bloque 4: Homeostasis del Hierro y Anemias',
    questionNumber: 24,
    questionText: 'Una paciente padece Artritis Reumatoide activa. Su perfil de laboratorio evidencia una hemoglobina descendida, hierro en plasma (ferremia) descendido, pero Ferritina normal o marcadamente elevada (Anemia de los Trastornos Crónicos o Inflamación). Fisiopatológicamente, ¿qué molécula impulsada por las citoquinas retiene el hierro forzadamente en el sistema reticuloendotelial?',
    options: [
      { letter: 'A', text: 'La lipoproteína LDL oxidada.' },
      { letter: 'B', text: 'La expresión de hepcidina inducida por interleucina-6 (IL-6), la cual clausura la vía de la ferroportina en los macrófagos tisulares impidiendo el reciclaje eritrocitario.' },
      { letter: 'C', text: 'El incremento patológico de transferrina que secuestra los depósitos esplénicos por exceso oxidativo.' },
      { letter: 'D', text: 'Mutación silenciosa en el receptor scavenger tipo 1 de las plaquetas activadas.' }
    ],
    correctAnswer: 'B',
    explanation: 'Las citocinas inflamatorias (especialmente IL-6) ordenan la superproducción hepática de hepcidina reactante, la cual inhibe la liberación de hierro sistémico "atrapándolo" en macrófagos y subiendo la ferritina.',
    tags: ['Anemia Inflamatoria', 'IL-6', 'Hepcidina', 'Macrófagos'],
    difficulty: 'Avanzado'
  },

  // --- BLOQUE 5 ---
  {
    id: 25,
    blockId: 5,
    blockTitle: 'Bloque 5: ALAS 1 y ALAS 2 (Enzimas Marcapasos del Hemo)',
    questionNumber: 25,
    questionText: 'La síntesis del grupo Hemo se inicia de forma crucial en la matriz mitocondrial condensando Glicina con Succinil-CoA mediado por la enzima Ácido \\(\\delta\\)-aminolevulínico sintasa (ALAS). En la especie humana existen dos isoformas génicas con destinos compartimentalizados. Identifique su localización dominante:',
    options: [
      { letter: 'A', text: 'ALAS1 es la isoforma de expresión pancreática exclusiva; ALAS2 se localiza en todos los miocitos ventriculares.' },
      { letter: 'B', text: 'ALAS1 tiene una distribución celular ubicua (predominio en hígado para los citocromos P450); ALAS2 se circunscribe y especializa exclusivamente en los precursores de linaje eritroide en la médula ósea.' },
      { letter: 'C', text: 'Ambas se expresan de forma constitutiva e indiferenciada en los eritrocitos maduros anucleados.' },
      { letter: 'D', text: 'ALAS1 actúa en el catabolismo del grupo hemo del glóbulo rojo senescente en el bazo, ALAS2 lo hace en riñones.' }
    ],
    correctAnswer: 'B',
    explanation: 'ALAS1 provee el hemo ubicuo "basal" (fundamentalmente al hepatocito), mientras que ALAS2 es específica de la médula ósea para la exigente síntesis masiva y orquestada de hemoglobina roja.',
    tags: ['ALAS1', 'ALAS2', 'Síntesis de Hemo', 'Médula Ósea', 'Hígado'],
    difficulty: 'Medio'
  },
  {
    id: 26,
    blockId: 5,
    blockTitle: 'Bloque 5: ALAS 1 y ALAS 2 (Enzimas Marcapasos del Hemo)',
    questionNumber: 26,
    questionText: 'La acumulación descontrolada de las porfirinas libres intermedios posee un perfil neurotóxico agudo. ¿Cuál es el estricto circuito de retroalimentación (feedback negativo) que evita este evento sobre la isoforma ALAS1 hepática?',
    options: [
      { letter: 'A', text: 'Es inhibida alostéricamente por un exceso de ATP derivado de la beta-oxidación de cadena larga.' },
      { letter: 'B', text: 'Es mediada por el producto final, el grupo Hemo libre (Hemina), el cual reprime velozmente la transcripción del gen y bloquea post-traduccionalmente el ingreso del péptido inmaduro a la mitocondria.' },
      { letter: 'C', text: 'El glutatión oxidado fosforila de forma covalente el residuo de triptófano en su sitio activo induciendo su destrucción por los proteasomas dependientes de pepsina.' },
      { letter: 'D', text: 'El ión calcio actúa suprimiendo de manera indirecta el transporte transmembrana por poro dependiente.' }
    ],
    correctAnswer: 'B',
    explanation: 'El Hemo es el modulador por excelencia que apaga su propia biosíntesis; suprime el ARNm de la enzima y retiene a la isoforma citosólica formada, deteniendo la reacción mitocondrial marcapasos para no generar porfirias toxicas.',
    tags: ['ALAS1', 'Hemina', 'Feedback Negativo', 'Porfirias'],
    difficulty: 'Medio'
  },
  {
    id: 27,
    blockId: 5,
    blockTitle: 'Bloque 5: ALAS 1 y ALAS 2 (Enzimas Marcapasos del Hemo)',
    questionNumber: 27,
    questionText: 'Un paciente indigente y con historia de alcoholismo crónico evidencia desnutrición generalizada, fatiga y anemia microcítica grave con "sideroblastos en anillo". Fisiopatológicamente, ¿por qué la deficiencia aislada del cofactor vitamínico frena la síntesis del grupo hemo en sus glóbulos rojos inmaduros?',
    options: [
      { letter: 'A', text: 'Porque la deficiencia de Vitamina B12 paraliza la enzima ferroquelatasa y rompe las moléculas de transferrina del medio plasmático.' },
      { letter: 'B', text: 'Porque ambas isoformas de la ALAS tienen dependencia molecular estricta e indispensable por el Piridoxal Fosfato (PLP), derivado orgánico activo de la Vitamina B6. Al faltar la vitamina, el primer paso mitocondrial de síntesis de porfirina queda totalmente bloqueado.' },
      { letter: 'C', text: 'Porque los folatos en baja concentración desencadenan hemólisis fulminante inhibiendo las G6PD medulares preformadas de manera temporal.' },
      { letter: 'D', text: 'Por deficiencia aislada de ácido pantoténico en los eritroblastos jóvenes.' }
    ],
    correctAnswer: 'B',
    explanation: 'El cofactor obligatorio para la enzima limitante ALAS es la Vitamina B6. Ante su ausencia crónica por alcoholismo o malnutrición, la maquinaria precursora del anillo de protoporfirina se detiene.',
    tags: ['Vitamina B6', 'PLP', 'ALAS2', 'Sideroblastos', 'Alcoholismo'],
    difficulty: 'Medio'
  },
  {
    id: 28,
    blockId: 5,
    blockTitle: 'Bloque 5: ALAS 1 y ALAS 2 (Enzimas Marcapasos del Hemo)',
    questionNumber: 28,
    questionText: 'En la patología de la pregunta anterior (falla del sistema enzimático ALAS2 u otras porfirias sideroblásticas), los eritroblastos presentan gránulos oscuros agrupados alrededor del núcleo, descritos como "sideroblastos en anillo". A nivel subcelular, esto se materializa como consecuencia de que:',
    options: [
      { letter: 'A', text: 'El exceso de ácido delta-aminolevulínico precipita en el citosol y se asienta aglutinando las cadenas maduras y deformes de globina alfa.' },
      { letter: 'B', text: 'A pesar del bloqueo en la síntesis de los anillos de protoporfirina, el hierro plasmático continúa ingresando de manera indetenida al orgánulo mitocondrial; al carecer de un armazón al cual adherirse y quelar, precipita en inútiles grumos insolubles de agregados férricos perinucleares.' },
      { letter: 'C', text: 'Se produce un colapso en la ferroportina tisular induciendo fagocitosis masiva.' },
      { letter: 'D', text: 'El tejido adiposo blanco invade de manera compensatoria el citosol de los glóbulos rojos jóvenes formando vacuolas gigantes alrededor del ADN.' }
    ],
    correctAnswer: 'B',
    explanation: 'La morfología sideroblástica clásica es hierro "varado"; el metal cruza las membranas mitocondriales listísimo para unirse, pero al no existir la macromolécula huésped de protoporfirina, genera gránulos tóxicos sin funcionalidad de hemoglobina.',
    tags: ['Sideroblastos en Anillo', 'Mitocondria', 'Hierro Perinuclear'],
    difficulty: 'Avanzado'
  },
  {
    id: 29,
    blockId: 5,
    blockTitle: 'Bloque 5: ALAS 1 y ALAS 2 (Enzimas Marcapasos del Hemo)',
    questionNumber: 29,
    questionText: 'Un operario de demolición es diagnosticado con una intoxicación crónica de plomo inorgánico (saturnismo) e ingresa en estado confusional con palidez y anemia severa y gran concentración del reactante ALA en orina. A nivel de toxicología bioquímica, el metal pesado desplaza y bloquea la catálisis sulfhidrílica de dos enzimas precisas de la ruta hemo que causan este corte. ¿Cuáles son?',
    options: [
      { letter: 'A', text: 'De forma exclusiva la ALA sintasa 1, causando depleción selectiva de hemoglobina a nivel renal medular.' },
      { letter: 'B', text: 'Las enzimas Citocromo P450 reductasa y transferrina plasmática.' },
      { letter: 'C', text: 'Inhibición dual de la enzima Uroporfirinógeno descarboxilasa y la Uroporfirinógeno III sintasa en la reacción tardía final de ensamblaje vascular del eritrocito.' },
      { letter: 'D', text: 'Interfiere e inhibe irreversiblemente de manera principal las enzimas \\(\\delta\\)-ALA Deshidratasa citosólica y la Ferroquelatasa mitocondrial.' }
    ],
    correctAnswer: 'D',
    explanation: 'El plomo inactiva potetemente estas dos enzimas con residuos sulfhidrilos. Al paralizar la ALA deshidratasa, se explica el drástico acúmulo sistémico y filtración urinaria excesiva y diagnóstica de su sustrato no reaccionado, el ALA.',
    tags: ['Saturnismo', 'Plomo', 'ALA Deshidratasa', 'Ferroquelatasa'],
    difficulty: 'Avanzado'
  },
  {
    id: 30,
    blockId: 5,
    blockTitle: 'Bloque 5: ALAS 1 y ALAS 2 (Enzimas Marcapasos del Hemo)',
    questionNumber: 30,
    questionText: 'Desde la visión patogénica opuesta: en un paciente anémico originado pura y exclusivamente por dietas de nula disponibilidad de alimentos contenedores de Fe inorgánico o hemínico (Anemia Ferropénica Severa de larga data), ¿sobre qué sustrato/enzima de la vía final colapsa directamente la carencia para limitar el fin productivo y armar un eritrocito útil?',
    options: [
      { letter: 'A', text: 'Al faltar hierro, la enzima marcapasos Ferroquelatasa interrumpe ineludiblemente el paso terminal en el cual el ión \\(Fe^{2+}\\) ferroso debe ser centralizado e integrado dentro del anillo de protoporfirina IX recién manufacturado en la mitocondria.' },
      { letter: 'B', text: 'Provoca destrucción inmediata de la Uroporfirinógeno III descarboxilasa.' },
      { letter: 'C', text: 'Bloquea genéticamente la transcripción ribosomal de la ALA sintasa hepática desde el inicio del gen en núcleo celular medular.' },
      { letter: 'D', text: 'Cesa de manera aguda e inespecífica toda desaminación periférica aledaña por acumulación del succinil-CoA inactivo remanente bloqueando la transcripción ribosomal sistémica de purinas en sangre periférica no regulada.' }
    ],
    correctAnswer: 'A',
    explanation: 'La ferroquelatasa cataliza exclusivamente el empalme final. Carente del material central de inserción (hierro), aborta la finalización de la molécula funcional de hemo en la eritropoyesis medular, lo cual frena drásticamente la capacidad y coloración roja de un eritrocito normal (Microcitosis hipocrómica).',
    tags: ['Ferroquelatasa', 'Protoporfirina IX', 'Anemia Ferropénica', 'Fe2+'],
    difficulty: 'Medio'
  }
];

export const MOCK_STUDENT_ATTEMPTS: StudentAttempt[] = [
  {
    id: 'att-101',
    studentName: 'Dra. Camila Morales',
    studentEmail: 'camila.morales@estudiante.med.edu',
    date: '2026-07-27 10:15',
    scorePercent: 90,
    correctCount: 27,
    totalQuestions: 30,
    timeSpentSeconds: 1420,
    blockScores: {
      1: { correct: 5, total: 5, percent: 100 },
      2: { correct: 5, total: 6, percent: 83 },
      3: { correct: 6, total: 7, percent: 86 },
      4: { correct: 6, total: 6, percent: 100 },
      5: { correct: 5, total: 6, percent: 83 }
    },
    answers: {
      1: { selected: 'C', correct: true },
      2: { selected: 'B', correct: true },
      3: { selected: 'C', correct: true },
      4: { selected: 'D', correct: true },
      5: { selected: 'C', correct: true },
      6: { selected: 'B', correct: true },
      7: { selected: 'C', correct: true },
      8: { selected: 'A', correct: false }, // Wrong answer for CPS-I NAG
      9: { selected: 'A', correct: true },
      10: { selected: 'C', correct: true },
      11: { selected: 'B', correct: true },
      12: { selected: 'B', correct: true },
      13: { selected: 'D', correct: true },
      14: { selected: 'B', correct: true },
      15: { selected: 'C', correct: true },
      16: { selected: 'B', correct: true },
      17: { selected: 'C', correct: true },
      18: { selected: 'A', correct: false },
      19: { selected: 'A', correct: true },
      20: { selected: 'B', correct: true },
      21: { selected: 'D', correct: true },
      22: { selected: 'B', correct: true },
      23: { selected: 'C', correct: true },
      24: { selected: 'B', correct: true },
      25: { selected: 'B', correct: true },
      26: { selected: 'B', correct: true },
      27: { selected: 'B', correct: true },
      28: { selected: 'B', correct: true },
      29: { selected: 'C', correct: false }, // Wrong on Saturnismo
      30: { selected: 'A', correct: true }
    }
  },
  {
    id: 'att-102',
    studentName: 'Mateo Fernández',
    studentEmail: 'mateo.f@estudiante.med.edu',
    date: '2026-07-27 11:40',
    scorePercent: 73,
    correctCount: 22,
    totalQuestions: 30,
    timeSpentSeconds: 1850,
    blockScores: {
      1: { correct: 4, total: 5, percent: 80 },
      2: { correct: 4, total: 6, percent: 67 },
      3: { correct: 5, total: 7, percent: 71 },
      4: { correct: 5, total: 6, percent: 83 },
      5: { correct: 4, total: 6, percent: 67 }
    },
    answers: {
      1: { selected: 'C', correct: true },
      2: { selected: 'B', correct: true },
      3: { selected: 'C', correct: true },
      4: { selected: 'A', correct: false },
      5: { selected: 'C', correct: true },
      6: { selected: 'B', correct: true },
      7: { selected: 'A', correct: false },
      8: { selected: 'D', correct: true },
      9: { selected: 'A', correct: true },
      10: { selected: 'B', correct: false },
      11: { selected: 'B', correct: true },
      12: { selected: 'B', correct: true },
      13: { selected: 'D', correct: true },
      14: { selected: 'C', correct: false },
      15: { selected: 'C', correct: true },
      16: { selected: 'B', correct: true },
      17: { selected: 'C', correct: true },
      18: { selected: 'B', correct: true },
      19: { selected: 'A', correct: true },
      20: { selected: 'B', correct: true },
      21: { selected: 'B', correct: false },
      22: { selected: 'B', correct: true },
      23: { selected: 'C', correct: true },
      24: { selected: 'B', correct: true },
      25: { selected: 'B', correct: true },
      26: { selected: 'A', correct: false },
      27: { selected: 'B', correct: true },
      28: { selected: 'B', correct: true },
      29: { selected: 'A', correct: false },
      30: { selected: 'A', correct: true }
    }
  },
  {
    id: 'att-103',
    studentName: 'Dra. Sofía Benítez',
    studentEmail: 'sofia.benitez@estudiante.med.edu',
    date: '2026-07-27 12:05',
    scorePercent: 97,
    correctCount: 29,
    totalQuestions: 30,
    timeSpentSeconds: 1100,
    blockScores: {
      1: { correct: 5, total: 5, percent: 100 },
      2: { correct: 6, total: 6, percent: 100 },
      3: { correct: 7, total: 7, percent: 100 },
      4: { correct: 6, total: 6, percent: 100 },
      5: { correct: 5, total: 6, percent: 83 }
    },
    answers: {
      1: { selected: 'C', correct: true },
      2: { selected: 'B', correct: true },
      3: { selected: 'C', correct: true },
      4: { selected: 'D', correct: true },
      5: { selected: 'C', correct: true },
      6: { selected: 'B', correct: true },
      7: { selected: 'C', correct: true },
      8: { selected: 'D', correct: true },
      9: { selected: 'A', correct: true },
      10: { selected: 'C', correct: true },
      11: { selected: 'B', correct: true },
      12: { selected: 'B', correct: true },
      13: { selected: 'D', correct: true },
      14: { selected: 'B', correct: true },
      15: { selected: 'C', correct: true },
      16: { selected: 'B', correct: true },
      17: { selected: 'C', correct: true },
      18: { selected: 'B', correct: true },
      19: { selected: 'A', correct: true },
      20: { selected: 'B', correct: true },
      21: { selected: 'D', correct: true },
      22: { selected: 'B', correct: true },
      23: { selected: 'C', correct: true },
      24: { selected: 'B', correct: true },
      25: { selected: 'B', correct: true },
      26: { selected: 'B', correct: true },
      27: { selected: 'B', correct: true },
      28: { selected: 'B', correct: true },
      29: { selected: 'B', correct: false },
      30: { selected: 'A', correct: true }
    }
  }
];
