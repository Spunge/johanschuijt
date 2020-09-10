
let chat_config = {
  "previous": [
    {
      "question": "Hmm, interessant, kunnen we het over iets anders hebben?",
      "answer": "Tuurlijk, wat wil je weten?"
    },
    {
      "question": "Okay, genoeg hierover.",
      "answer": "Ehh, wil je nog iets anders weten?"
    }
  ],
  "questions": {
    "start": {
      "answer": "Als je nog vragen hebt kun je er hier een aantal stellen, ik zal m'n best doen ze zo goed mogelijk te beantwoorden.",
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

// Make sure i answer questions, would be rude not to
const init_chat = async function() {
}

window.addEventListener('DOMContentLoaded', (event) => {
  init_slides();
  init_chat();
});
