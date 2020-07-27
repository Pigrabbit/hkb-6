// Entry file
import hello_word from "./hello";
import world_word from "./world";

import css from './style.css';
import catImage from './cat.jpg';

document.querySelector("#root").innerHTML = `${hello_word}, ${world_word}`;

const catElement = document.createElement('img');
catElement.src = catImage;

document.querySelector("#root").appendChild(catElement);
