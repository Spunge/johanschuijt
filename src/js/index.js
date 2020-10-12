
let asked_questions = [];
let chat_history = [];
let can_ask_question = true;
let chat_config = {
  "previous": [{
    "short": "Hmm, interessant, kunnen we het over iets anders hebben?",
    "answer": "Tuurlijk, wat wil je weten?"
  }, {
    "short": "Okay, genoeg hierover. Mag ik nog wat vragen?",
    "answer": "Ehh, okay, wat wil je weten dan?"
  }, {
    "short": "Alright, even wat anders...?",
    "answer": "Hmmm, wat dan?",
  }, {
    "short": "Wouw, nice, dat wist ik niet, kan je nog iets anders vertellen?",
    "answer": "Ha, zo leer je elke dag weer wat, natuurlijk! Wat wil je weten?",
  }, {
    "short": "Okay, dope.",
    "answer": "Ha, als jij t zegt.",
  }, {
    "short": "Alright, kunnen we nog even terug?",
    "answer": "Sure, wat wilde je nog vragen?",
  }, {
    "short": "Eeeeh, pfff, hier wil ik niet over praten okay?",
    "answer": "Oh ja, okay, is goed, waar dan wel over?",
  }, {
    "short": "Mag ik je bedanken voor de informatie?",
    "answer": "Natuurlijk, Graag gedaan, ik hoop dat je er iets mee kunt. Anders nog iets?",
  }, {
    "short": "Hmmm...?",
    "long": "Hmmm wat?",
    "answer": "Oh haha, huh?",
  }],
  "questions": {
    "start": {
      "answer": "Als je nog vragen hebt kun je er hier een paar stellen, ik zal m'n best doen ze zo goed mogelijk te beantwoorden.",
      "sequels": ["what_chatbot", "what_about_person", "what_about_business"],
    },
    "what_about_business": {
      "short": "Okay, even zakelijk...?",
      "long": "Even ter zake, kan je me wat meer vertellen over zakelijke onderwerpen?",
      "answer": "Alright, wat zou je willen weten?",
      "sequels": ["so_you_are_programmer", "what_you_add_to_business", "where_work"],
    },
    "so_you_are_programmer": {
      "short": "Jij bent programmeur?",
      "long": "Je bent programmeur zeg je, kan je daar wat meer over vertellen?",
      "answer": "Yeah, ik programmeer al meer dan 10 jaar voor m'n werk, en ook veel voor m'n hobby.",
      "sequels": ["how_much_experience_languages", "what_programming_joyful", "what_you_self_learn_update"],
    },
    "how_much_experience_languages": {
      "short": "Hoe veel ervaring heb je met de talen waarvan je aangeeft dat je er ervaring mee hebt?",
      "answer": "Javascript zet ik al bijna 10 jaar in. Rust heb ik net een jaar ervaring mee en gebruik ik tot nog toe alleen voor m'n drummachine. PHP heb ik vroeger jaren gebruikt. Python en Ruby heb ik maar voor een aantal projecten gebruikt. C heb ik veel gelezen, maar weinig zelf in geschreven.",
    },
    "what_programming_joyful": {
      "short": "Wat vindt je het leukst om te programmeren?",
      "answer": "Rust, by far. Ik wordt ook erg vrolijk van het programmeren van audio software omdat dit overlap heeft met mijn muzikale ambities.",
    },
    "what_you_add_to_business": {
      "short": "Wat kan jij voor ons betekenen?",
      "answer": "Ik heb veel ervaring met architectuur, en communiceer makkelijk met anderen. Overzicht bewaren is mijn sterke kant denk ik zelf.",
    },
    "what_you_self_learn_update": {
      "short": "Wat doe je om jezelf up-to-date te houden als programmeur?",
      "answer": "Ik probeer altijd meer talen te leren, ik denk dat dat een goede manier is om te verbeteren als programmeur. Nieuwe technologie ben ik niet altijd mee bezig omdat het wiel vaak opnieuw uitgevonden wordt in de IT.",
    },
    "what_about_person": {
      "short": "Mag ik nog iets vragen over jou persoonlijk?",
      "answer": "Tuurlijk mag dat, wat bedoel je precies met persoonlijk?",
      "sequels": ["what_past", "what_present", "what_future", "why_live"],
    },
    "what_present": {
      "short": "Kan ik nog wat meer horen over je huidige situatie?",
      "answer": "Okay, zoals wat?",
      "sequels": ["where_live", "what_hobbies", "why_no_social"],
    },
    "what_hobbies": {
      "short": "Muziek maken en lezen, nice man!",
      "answer": "Ja, ik ga er zelf ook wel echt goed op.",
      "sequels": ["what_about_music", "what_books"],
    },
    "what_future": {
      "short": "Je toekomst, hoe ziet die er uit?",
      "answer": "Als ik dat toch eens wist...",
    },
    "what_about_music": {
      "short": "Ik wilde graag meer weten over je muziek, kan je daar wat over vertellen?",
      "answer": "Sure, ik maak in m'n 1tje digitale muziek met mijn controllers en met m'n bandjes pop en blues muziek",
      "sequels": ["how_create_drummachine", "what_kind_of_music"],
    },
    "how_create_drummachine": {
      "short": "Hoe maak je dan zo'n drummachine?",
      "answer": "Oef, dat is nog al een verhaal, ik gebruik hiervoor 2 midi-controllers van AKAI, linux als platform en Rust als programmeertaal.",
      "sequels": ["why_drummachine_rust", "why_create_self_not_buy"],
    },
    "why_drummachine_rust": {
      "short": "Waarom gebruik je daarvoor Rust?",
      "answer": "Omdat een drummachine real-time software is, en je dus een zeer snelle taal wil gebruiken. Elke 5 milliseconden loop ik door 80 patterns, met daarin <x> noten, dit alles kost nog geen procent aan processor kracht. Computers zijn belachelijk snel tegenwoordig."
    },
    "why_create_self_not_buy": {
      "short": "Waarom maak je dat zelf?",
      "long": "Waarom koop je niet gewoon een drummachine, in plaats van het zelf maken?",
      "answer": "Omdat ik op linux muziek wilde maken in eerste instantie en al een geschikte controller hiervoor had, daarnaast omdat de drummachine die ik wil niet te koop is.",
    },
    "what_kind_of_music": {
      "short": "Wat voor muziek maak je en met wie?",
      "answer": "Zelf maak ik voornamelijk bass music, hiphop en gerelateerde genres hou ik van. Met Ootes π Lotus maak ik vrolijke pop-rock en met \"no-plan\" maak ik bluesrock."
    },
    "what_books": {
      "short": "Wat vind je leuke boeken?",
      "answer": "Ik lees voornamelijk filosofie, en wissel dit af met economie, en psychologie. Soms lees ik wat fictie als tussendoortje. Ik ben nu bijvoorbeeld bezig in \"Magie en Emotie\" van Jean-Paul Sartre. Het boek dat ik net uit heb is \"The Ascent of Money\" door Niall Ferguson.",
    },
    "why_no_social": {
      "short": "Waarom heb je geen social media?",
      "answer": "Omdat ik niet als product verhandeld wil worden door grote techpartijen. Daarnaast wil ik mezelf niet in een mal laten gieten, ik maak m'n eigen webpagina wel.",
      "previous": [{
        "short": "Mis je dan geen sociale evenementen of andere dingen?",
        "answer": "Nee, eigenlijk niet, chat is genoeg om overal van op de hoogte te blijven eigenlijk.",
      }],
    },
    "what_chatbot": {
      "short": "Wat is dit nou weer, een chatbot?",
      "long": "Ehhh, serieus, praat ik nu met een chatbot?",
      "answer": "Nee, je doorloopt een vooraf gecreerde vraag/antwoord graaf.",
      "sequels": ["where_idea_chatbot", "why_no_faq"],
    },
    "why_no_faq": {
      "short": "Wow, vreemd, waarom geen FAQ?",
      "answer": "Omdat dit een stuk persoonlijker voelt vind je niet?",
      "previous": [{
        "short": "Ja, best wel..",
        "answer": "Ha, dat hoor ik graag.",
      }, {
        "short": "Valt mee man, voelt alsof ik met een computer praat.",
        "answer": "Dat is ook zo...",
      }],
    },
    "where_idea_chatbot": {
      "short": "Hoe ben je op dat idee gekomen?",
      "answer": "Deze techniek wordt veel gebruikt in games voor non-player-characters.",
    },
    "what_past": {
      "short": "Kan ik je nog wat vragen over je verleden?",
      "answer": "Natuurlijk, ik heb nogal wat achter de rug, wat zou je willen weten?",
      "sequels": ["what_childhood", "why_mid_school_sent_away"],
    },
    "what_childhood": {
      "short": "Hoe was het opgroeien?",
      "answer": "Ik groeide op in een klein Noord-Hollands dorpje waar alle ruimte was om buiten te spelen en hutten te bouwen, wat ik ook veel gedaan heb.",
      "sequels": ["how_relation_parents", "how_young_social_life", "what_young_build"],
    },
    "what_young_build": {
      "short": "Hutten bouwen, nice!",
      "answer": "Ja, daar heb ik veel handigheid aan over gehouden.",
      "previous": [{
        "short": "Fijn man.",
        "answer": "Yeah!",
      }],
    },
    "why_mid_school_sent_away": {
      "short": "Ruige schooltijd zo te zien, waarom was dat?",
      "answer": "Omdat ik voor mezelf dacht en de lessen voor mij niet of nauwelijks uitdagend waren, hierdoor was ik verveeld in lessen, wat voor niemand goed was, niet voor de leraar en niet voor mij.",
      "previous": [
        {
          "short": "Ja dat werkt niet he..",
          "answer": "Nee, maar achteraf ben ik wel blij dat ik allerlei onderwijsvormen gezien heb, privaat & publiek middelbaar onderwijs, MBO & HBO. Ik heb ook aardig wat colleges op de universiteit bijgewoond.",
        },
        {
          "short": "Heb je daar geen spijt van?",
          "answer": "Ja, soms vindt ik het wel jammer dat ik hierdoor de universiteit misgelopen ben, maar ik heb wel geleerd voor mezelf te denken.",
        },
      ],
    },
    "how_young_social_life": {
      "short": "Hoe was je sociale leven in dat dorp?",
      "answer": "Niet slecht. Ik was een slimme jongen in een klein dorp, dus viel ik soms een beetje buiten de boot, maar ik heb er wel altijd vrienden gehad.",
    },
    "how_relation_parents": {
      "short": "Hoe was de relatie met je ouders toendertijd?",
      "answer": "Goed, ik ben opgegroeid met 2 liefhebbende ouders.",
    },
    "where_live": {
      "short": "Waar woon je?",
      "answer": "Ik woon aan de Utrechtseweg tussen Utrecht en de Bilt in. Hiervoor heb ik een aantal jaar in Maassluis en Rotterdam gewoond, en op veel verschillende plekken in Utrecht gewoond.",
      "previous": [{
        "short": "Hoezo veel plekken?",
        "answer": "Ik heb in bijna elke wijk in Utrecht wel even gewoond. Dit mede door een jaar kamers onder te huren om zo de stad en veel mensen te leren kennen.",
      }]
    },
    "where_work": {
      "short": "Heb je je eigen werkplek? Zo ja, waar?",
      "answer": "Yes, ik heb een bureau in een broedplaats aan de Gruttersdijk in Utrecht",
    },
    "what_color": {
      "short": "Wat is je favoriete kleur?",
      "long": "Ik ben echt enorm benieuwd naar je favoriete kleur, welke zou je kiezen?",
      "answer": "Pfff.. ik heb niet echt een favoriete kleur, maar groen rood en fel oranje vind ik mooi."
    },
    "why_live": {
      "short": "Wat vind je op dit moment belangrijk in het leven?",
      "answer": "Lastige vraag, allereerst mensen om me heen gelukkiger maken, ten tweede zorgen voor onze planeet. Daarnaast wil ik zo veel mogelijk leren.",
      "sequels": ["why_create_happiness", "why_protect_planet", "what_learn"]
    },
    "why_create_happiness": {
      "short": "Waarom zou je andere mensen gelukkig willen maken in plaats van jezelf?",
      "answer": "Omdat ik daar zelf vervolgens ook gelukkiger van wordt."
    },
    "why_protect_planet": {
      "short": "Waarom zou je de planeet beschermen? Over een tijdje ben je toch dood.",
      "answer": "Ik zou het fijn vinden als de mens het nog haalt om buiten de grenzen van onze moederplaneet te wonen zonder dat we daarvoor ons ecosysteem vernietigen.",
      "previous": [{
        "short": "Ja dat zou mooi zijn.",
        "answer": "Yeah, ik hoop dat we t kunnen.",
      }, {
        "short": "Maar we kunnen ook ons ecosysteem vernietigen en de grondstoffen van de hemellichamen om ons heen gebruiken toch?",
        "answer": "Dat kan, maar dat maakt ons niet anders dan een virus. Ik hoop dat we anders zijn dan een virus.",
      }],
    },
    "what_learn": {
      "short": "Wat zou je dan zo al willen leren?",
      "answer": "Ik zou graag meer over muziek leren, vooral over harmonie en melodie en de relaties daartussen. Daarnaast ben ik geinteresseerd in filosofie, natuurkunde en andere programmeertalen."
    }
  }
};

// Make sure lightbox opens on clicking images
const init_slides = function() {
  let slides = Array.from(document.querySelectorAll('.slide'));

  let items = slides.map(slide => {
    // We resize originals to 4200/2800, see gulpfile
    return { src: slide.getAttribute('href'), w: 4200, h: 2800, };
  });

  let pswpElement = document.querySelectorAll('.pswp')[0];

  slides.forEach(slide => {
    slide.addEventListener('click', e => {
      e.preventDefault();

      let options = {
        index: slides.indexOf(slide),
        loop: false,
      };

      let gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    })
  })
}

const create_chat_message_image = function(name, position = 'left') {
  let figure = document.createElement('figure');
  figure.classList.add(`media-${position}`, 'mx-0', 'mt-0');

  let image_desktop = document.createElement('div');
  image_desktop.classList.add('image', 'is-96x96', 'is-hidden-mobile');
  let image_desktop_name = document.createElement('p');
  image_desktop_name.classList.add('my-0', 'is-size-1', 'pt-2');
  image_desktop_name.innerHTML = name;
  image_desktop.append(image_desktop_name);

  let image_mobile = document.createElement('div');
  image_mobile.classList.add('image', 'is-48x48', 'is-hidden-tablet');
  let image_mobile_name = document.createElement('p');
  image_mobile_name.classList.add('my-0', 'mt-4', 'is-size-4', 'pt-1');
  image_mobile_name.innerHTML = name;
  image_mobile.append(image_mobile_name);

  figure.append(image_desktop);
  figure.append(image_mobile);
  return figure;
}

const create_chat_message_content = function(name, text) {
  let content = document.createElement('div');
  content.classList.add('media-content', 'pb-1');

  let content_name = document.createElement('h5');
  content_name.classList.add('title', 'is-4', 'mt-5', 'mb-0');
  content_name.innerHTML = name;
  let content_text = document.createElement('p');
  content_text.classList.add('mt-3');
  content_text.innerHTML = text;

  content.append(content_name, content_text);

  return content;
}

const create_own_chat_message = function(text) {
  let image = create_chat_message_image('J', 'left');
  let content = create_chat_message_content('Johan', text);

  let article = document.createElement('article');
  article.classList.add("media");
  article.append(image, content);

  return article;
}

const create_guest_chat_message = function(text) {
  let image = create_chat_message_image('G', 'right');
  let content = create_chat_message_content('Gast', text);

  let article = document.createElement('article');
  article.classList.add("media");
  article.append(content, image);

  return article;
}

// Check all sequels, if they are all asked, this question is asked aswell
const is_question_asked = function(question_config) {
  if(question_config.hasOwnProperty('tag')) {
    if(question_config.hasOwnProperty('sequels')) {
      return get_question_configs_by_tags(question_config.sequels).map(is_question_asked).reduce((a, b) => a && b);
    } else {
      return asked_questions.indexOf(question_config.tag) !== -1;
    }
  } else {
    return false;
  }
}

// Create chat question element
const create_chat_question = function(question_config, callback = () => {}) {
  let anchor = document.createElement('a');
  anchor.classList.add('question');

  // Mark asked questions
  if(is_question_asked(question_config)) {
    anchor.classList.add('asked-question');
  }

  if( ! question_config.hasOwnProperty('tag')) {
    anchor.classList.add('back-question');
  }

  anchor.innerHTML = question_config.short;

  anchor.addEventListener('click', e => {
    e.preventDefault();

    if(can_ask_question) {
      // Callback here so we can pop history for back questions
      callback();
    }
  });

  return anchor;
}

// Load questions into DOM
const set_questions = function(questions) {
  let container = document.querySelectorAll('.chat .questions')[0];
  container.innerHTML = '';
  container.append(...questions);
}

// Wait a bit
const delay = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const get_random_back_question = function(options) {
  let index = Math.floor(Math.random() * options.length);
  return JSON.parse(JSON.stringify(options[index]));
}

const get_absolute_height = function(element) {
  // Get the DOM Node if you pass in a string
  var styles = window.getComputedStyle(element);
  var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

  return Math.ceil(element.offsetHeight + margin);
}

const append_message = function(container, message) {
  container.append(message);

  let bounding = message.getBoundingClientRect();
  let message_in_viewport = bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight);

  if(message_in_viewport) {
    document.documentElement.scrollTop += get_absolute_height(message);
  }
}

const render_question_and_answer = async function(config) {
  // Disable asking questions when answering
  can_ask_question = false;
  let container = document.querySelectorAll('.chat .messages')[0];

  if(config.hasOwnProperty('long') || config.hasOwnProperty('short')) {
    let question = create_guest_chat_message(config.hasOwnProperty('long') ? config.long : config.short);
    append_message(container, question);
  }

  await delay((Math.random() * 500) + 250);
  container.classList.add('typing');

  await delay(config.answer.length * 12 + 250);
  let answer_element = create_own_chat_message(config.answer);
  append_message(container, answer_element);

  container.classList.remove('typing');
  can_ask_question = true;
}

const get_question_configs_by_tags = function(tags) {
  return tags.map(tag => {
    // Add tag to config so we can use it for
    let data = chat_config.questions[tag];
    data.tag = tag;
    return data;
  });
}

// Render next questions after asking a question
const render_next_questions = function(question_config) {
  let next_questions = [];

  if(question_config.hasOwnProperty('sequels')) {
    // Print sequels
    next_questions.push(...create_questions(get_question_configs_by_tags(question_config.sequels)));

    // Print previous questions
    if( ! question_config.hasOwnProperty('previous') && chat_history.length > 1) {
      // Print questions own previous questions
      next_questions.push(...create_back_questions([get_random_back_question(chat_config.previous)]));
    }
  }

  // Always print questions own previous questions
  if(question_config.hasOwnProperty('previous')) {
    next_questions.push(...create_back_questions(question_config.previous));
  }

  if(next_questions.length) {
    set_questions(next_questions);
  } else {
    render_next_questions(chat_history[chat_history.length - 1]);
  }
}

const create_questions = function(questions) {
  return questions.map(question_config => {
    // Pass callback that gets executed on clicking the question
    return create_chat_question(question_config, async () => { 
      // Remember what questions people asked to help them
      if(question_config.hasOwnProperty('tag') && asked_questions.indexOf(question_config.tag) === -1) {
        asked_questions.push(question_config.tag);
      }

      await render_question_and_answer(question_config); 

      // Should we be able to go back?
      if(question_config.hasOwnProperty('sequels') || question_config.hasOwnProperty('previous')) {
        chat_history.push(question_config);
      }

      render_next_questions(question_config);
    });
  })
};

const create_back_questions = function(questions) {
  return questions.map(question_config => {
    return create_chat_question(question_config, async () => {
      chat_history.pop();

      await render_question_and_answer(question_config); 
      render_next_questions(chat_history[chat_history.length - 1]);
    })
  })
};

// Make sure i answer questions, would be rude not to
const init_chat = async function() {
  await render_question_and_answer(chat_config.questions.start);
  chat_history.push(chat_config.questions.start);
  set_questions(create_questions(get_question_configs_by_tags(chat_config.questions.start.sequels)))
}

window.addEventListener('DOMContentLoaded', (event) => {
  init_slides();
  init_chat();
});
