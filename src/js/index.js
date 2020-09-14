
let chat_config = {
  "previous": [
    {
      "short": "Hmm, interessant, kunnen we het over iets anders hebben?",
      "answer": "Tuurlijk, wat wil je weten?"
    },
    {
      "short": "Okay, genoeg hierover.",
      "answer": "Ehh, wil je nog iets anders weten?"
    }
  ],
  "questions": {
    "start": {
      "answer": "Als je nog vragen hebt kun je er hier een paar stellen, ik zal m'n best doen ze zo goed mogelijk te beantwoorden.",
      "sequels": ["what_chatbot", "why_live", "what_color"]
    },
    "what_chatbot": {
      "short": "Wat? Een chatbot?",
      "long": "Ehhh, serieus, praat ik nu met een chatbot?",
      "answer": "Nee, je doorloopt een vooraf gecreerde vraag/antwoord graaf."
    },
    "what_color": {
      "short": "Wat is je favoriete kleur?",
      "long": "Ik ben echt enorm benieuwd naar je favoriete kleur, welke zou je kiezen?",
      "answer": "Pfff.. ik heb niet echt een favoriete kleur, maar groen rood en fel oranje vind ik mooi."
    },
    "why_live": {
      "short": "Waar leef jij nou eigenlijk voor?",
      "long": "Allemaal leuk en aardig, maar waar leef jij nou eigenlijk voor?",
      "answer": "Lastige vraag, allereerst om de mensen om me heen gelukkiger te maken, ten tweede om te zorgen voor onze planeet. Daarnaast wil ik zo veel mogelijk leren.",
      "sequels": ["why_create_happiness", "why_protect_planet", "what_learn"]
    },
    "why_create_happiness": {
      "short": "Waarom zou je andere mensen gelukkig willen maken in plaats van jezelf?",
      "answer": "Omdat ik daar zelf vervolgens ook gelukkiger van wordt."
    },
    "why_protect_planet": {
      "short": "Waarom zou je de planeet beschermen? Over een tijdje ben je toch dood.",
      "answer": "Ik zou het fijn vinden als de mens het nog haalt om buiten de grenzen van onze moederplaneet te wonen zonder dat we voor die tijd ons ecosysteem vernietigen."
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
  let image = document.createElement('div');
  image.classList.add('image', 'is-96x96');

  let image_name = document.createElement('p');
  image_name.classList.add('my-0', 'is-size-1', 'pt-2');
  image_name.innerHTML = name;

  image.append(image_name);
  figure.append(image);
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

// Create chat question element
const create_chat_question = function(question_config) {
  let anchor = document.createElement('a');
  anchor.classList.add('question');
  anchor.innerHTML = question_config.short;

  anchor.addEventListener('click', e => {
    e.preventDefault();
    // If this question does not have a tag, it's a "previous" question, so pop history
    if( ! question_config.hasOwnProperty('tag')) {
      let config = chat_history.pop();
    }

    ask_question(question_config);
  });

  return anchor;
}

let chat_history = [];

// Load questions into DOM
const set_questions = function(questions) {
  let container = document.querySelectorAll('.chat .questions')[0];
  container.innerHTML = '';
  container.append(...questions);
}

// Get question config blob
const get_question_config = function(tag) {
  let question = JSON.parse(JSON.stringify(chat_config.questions[tag]));
  question.tag = tag;

  if( ! question.sequels) {
    question.sequels = [];
  }

  return question;
}

const delay = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const get_random_back_question = function() {
  let index = Math.floor(Math.random() * chat_config.previous.length);
  return JSON.parse(JSON.stringify(chat_config.previous[index]));
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

const ask_question = async function(config) {
  let container = document.querySelectorAll('.chat .messages')[0];

  // Only ask questions when we're not answering a question now
  if( ! container.classList.contains('answering')) {
    container.classList.add('answering');

    // If this has a tag, it's an actual question, if not, it's a "previous" question
    if(config.hasOwnProperty('tag')) {
      chat_history.push(config);
    }

    if(config.hasOwnProperty('long') || config.hasOwnProperty('short')) {
      let question = create_guest_chat_message(config.hasOwnProperty('long') ? config.long : config.short);
      append_message(container, question);
    }

    await delay((Math.random() * 500) + 250);
    container.classList.add('typing');

    await delay(config.answer.length * 15 + 500);
    let answer = create_own_chat_message(config.answer);
    append_message(container, answer);

    container.classList.remove('typing');

    let questions = config.sequels
      .map(tag => get_question_config(tag))
      .map(question_config => create_chat_question(question_config));

    if(chat_history.length > 1) {
      let back_question = get_random_back_question();
      back_question.sequels = chat_history[chat_history.length - 2].sequels;

      questions.push(create_chat_question(back_question));
    }

    set_questions(questions);

    container.classList.remove('answering');
  }
}

// Make sure i answer questions, would be rude not to
const init_chat = async function() {
  let question_config = JSON.parse(JSON.stringify(chat_config.questions.start));
  question_config.tag = 'start';
  ask_question(question_config);
}

window.addEventListener('DOMContentLoaded', (event) => {
  init_slides();
  init_chat();
});
