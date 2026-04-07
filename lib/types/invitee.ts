export type GuestType = 'Aus' | 'Pom' | 'Kiwi'

export type BeerChoice = 'Hazy' | 'Lager' | 'Sour' | 'Ginger Beer' | 'Other'

export interface Invitee {
  id: string
  token: string
  name: string
  display_name: string | null
  type: GuestType
  welcome_message: string | null
  rsvp_attending: boolean | null
  dietary_requirements: string | null
  beer_choice: BeerChoice | null
  beer_other_details: string | null
  last_accessed_at: string | null
  created_at: string
  updated_at: string
}
