# transition

Class for enabling stop/resume for css3 transitions.

## Usage

Starting transition:

    var el = $("img");
    var duration = 10000;
    var delay = 2000;
    var t = new Transition(el, 'transform', 'scale(4)', duration, delay); 

Pausing transition:

    t.pause();

Resuming transition:

    t.resume();

## Requirements

- JQuery

## Tested on

- Safari
- Firefox (Mac)
- Chrome (Mac)

