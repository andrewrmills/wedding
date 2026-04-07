// Centralised copy — all user-facing text lives here.
// Never hardcode strings in components.

export const WELCOME_MESSAGE = {
  Aus: "Chut and Gabbi's Wedding",
  Pom: "Gabbi and Andrew's Wedding",
  Kiwi: "Andrew and Gabbi's Wedding",
} as const

export const HERO = {
  scrollPrompt: 'Scroll',
} as const

export const MAP = {
  intro: (firstName: string) =>
    `Dear ${firstName}, we're getting married and would love you to join us.`,
} as const

export const RSVP = {
  attendingLabel: 'Can you make it?',
  optionYes: 'Nah, yeah',
  optionNo: 'Yeah, nah',
  pomTranslationYes: '(Yes)',
  pomTranslationNo: '(No)',
dietaryLabel: 'Any dietary requirements?',
  dietaryPlaceholder: 'e.g. vegetarian, nut allergy, gluten free...',
  beerLabel: 'Help us stock the bar — what\'s your beer?',
  beerOptions: ['Hazy Pale Ale', 'Lager', 'Sour', 'Ginger Beer', 'Other'] as const,
  beerOtherPlaceholder: 'Tell us more...',
  submitLabel: 'Submit',
  successAttending: "You're on the list. See you there 🎉",
  successNotAttending: "We'll miss you. Thanks for letting us know 💛",
  changeAnswer: 'Change my answer',
} as const

export const ERROR = {
  invalidToken:
    "We couldn't find your invitation. Please check your link or contact us.",
} as const

export const CEREMONY = {
  venueName: 'The Beach',
  addressLines: ['Corner Marine Pde & Pandora St', 'North New Brighton', 'Christchurch'],
  date: '13th Feb 2027',
  time: '2pm',
  lat: -43.48750040243022,
  lng: 172.724813561856,
} as const

export const RECEPTION = {
  venueName: 'Our House',
  addressLines: ['6a Pandora St', 'North New Brighton', 'Christchurch'],
  lat: -43.48807024683603,
  lng: 172.7208945165229,
} as const
