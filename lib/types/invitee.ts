export type GuestType = 'Aus' | 'Pom' | 'Kiwi'

export type BeerChoice = 'Hazy Pale Ale' | 'Lager' | 'Sour' | 'Ginger Beer' | 'Other'

export interface Invitee {
  id: string
  token: string
  name: string
  type: GuestType
  welcome_message: string | null
  rsvp_attending: boolean | null
  dietary_requirements: string | null
  beer_choice: BeerChoice | null
  beer_other_details: string | null
  created_at: string
  updated_at: string
}
