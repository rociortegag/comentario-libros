var _ = require('underscore');

/*En este js describimos las opciones que vamos a tener para la variable libros de nuestra biblioteca.
 * En nuestro caso hemos añadido tres libros (name) y hemos añadido cada una de sus sipnosis en facts.
*/
var libros = [
  { 
    name: 'El alquimista',
    facts: ['El libro trata sobre los sueños y los medios que utilizamos para alcanzarlos,sobre el azar en nuestra vida y las señales que se presentan a lo largo de esta.Esta considerado como una parafrasis del cuento Las mil y una noches: en definitiva, las aventuras de un heroe que busca su tesoro, lejos de su hogar, para regresar a el y hallarlo, sufriendo durante todo el viaje una transformacion en lo que a su visión del mundo y la realidad se refiere.'
      ] 
  },
  {
    name: 'El nombre de la Rosa',
    facts: ['Ambientada en el turbulento ambiente religioso del siglo xiv, la novela narra la investigacion que realizan fray Guillermo de Baskerville y su pupilo Adso de Melk alrededor de una misteriosa serie de crimenes que suceden en una abadia de los Apeninos ligures.'
      ]
  },
  {
    name: 'Romeo y Julieta',
    facts: ['Es una tragedia de William Shakespeare. Cuenta la historia de dos jovenes enamorados que, a pesar de la oposicion de sus familias, rivales entre si, deciden casarse de forma clandestina y vivir juntos; sin embargo, la presion de esa rivalidad y una serie de fatalidades conducen al suicidio de los dos amantes.'
      ]
  }  
];
/*A continuación hemos definidos las funciones en las que se muestran los libros,
 * se detectan al elegirlos y se publican las opiniones sobre los libros */

exports.index = function(req, res) {
  var names = libros.map(function(p) { return p.name; });
  res.render('index', { libros: names })
};

exports.libro = function(req, res) {
  var facts = _(libros).detect(function (p) { 
    return p.name == req.params.name;
  }).facts;
  res.json(facts);
}

exports.addFact = function(req, res) {
  var libro = _(libros).detect(function(p) {
    return p.name == req.body.name;
  });
  
  libro.facts.push(req.body.fact);
  
  console.log('Se ha publicado una nueva opinion de :  ' + libro.name + '\nLa opinion es : ' + req.body.fact);
  
  res.json({status: 'ok' });
}
