import {groq} from 'next-sanity';


export const allProduct = groq`*[_type == "product"]`;

export const sixProduct = groq`*[_type == "product"][0...6]`;

export const men = groq`*[_type == 'product' && category == "Men"]`;

export const women = groq`*[_type == 'product' && category == "women"]`;

export const kids = groq`*[_type == 'product' && category == "kids"]`;

export const SNKRS = groq`*[_type == 'product' && category == "SNKRS"]`;

