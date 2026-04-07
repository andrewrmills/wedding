Wedding RSVP Web App — Full Build Prompt
Project Overview
Build a single-page wedding RSVP web application hosted on Vercel with a Supabase backend. Each invitee receives a unique magic link containing a token in the URL (e.g. /rsvp?token=abc123). On load, the app reads the token, looks up the invitee in Supabase, and personalises the entire experience based on their record. The app is always editable — invitees can return via their magic link at any time and update their RSVP.

Tech Stack

Frontend: Next.js (App Router), hosted on Vercel
Backend: Supabase (Postgres database + Supabase client)
3D: Three.js with @react-three/fiber and @react-three/drei
Map: Google Maps JavaScript API (with Maps JS API and Directions/Places)
Scroll animation: GSAP ScrollTrigger (to drive Three.js animation and map reveal)
Styling: Tailwind CSS


Supabase Database Schema
invitees table
ColumnTypeNotesiduuidPrimary keytokenuuidUnique token used in the magic linknametextFull name of inviteetypetextOne of: "Aus", "Pom", "Kiwi"welcome_messagetextOptional override; if null, derive from typersvp_attendingbooleantrue = attending, false = not attending, null = not yet respondeddietary_requirementstextFree text, nullablebeer_choicetextOne of the beer options, nullablebeer_other_detailstextFree text if beer choice is "Other", nullablecreated_attimestamptzAutoupdated_attimestamptzAuto-updated on every write

Magic Link & Auth Flow

Magic links take the form: https://yourdomain.com/rsvp?token=<uuid>
On page load, read the token query parameter
Query Supabase: SELECT * FROM invitees WHERE token = $1
If no match is found, show a friendly error state: "We couldn't find your invitation. Please check your link or contact us."
If a match is found, load the full page experience personalised to that invitee
No login, no session, no cookies — the token in the URL is the only auth mechanism
Row Level Security (RLS) should be enabled on the invitees table. Create a Supabase RLS policy that allows SELECT and UPDATE only where token = current_setting('app.token')::uuid. Set this via SET LOCAL app.token = $1 before each query, using the Supabase service role on the server side (Next.js API route or Server Action)


Page Structure & Scroll Experience
The page is one continuous scroll. All scroll-driven behaviour should be implemented using GSAP ScrollTrigger pinning the WebGL canvas in the viewport while the rest of the page scrolls beneath/over it.

Section 1 — Hero / Welcome

Full-viewport hero section
Displays the invitee's welcome message, derived from their type field:

"Aus" → "Chut and Gabbi's Wedding"
"Pom" → "Gabbi and Andrew's Wedding"
"Kiwi" → "Andrew and Gabbi's Wedding"
If the welcome_message column is non-null, use that value instead of the derived one


The invitee's first name should appear below in a smaller subtitle: e.g. "We can't wait to celebrate with you, [Name]."
A subtle scroll prompt (e.g. animated chevron or "scroll down" text) should appear at the bottom of the hero


Section 2 — Three.js Wedding Cake (Scroll-Animated)

Load a .glb / .gltf wedding cake model using @react-three/drei's useGLTF hook
The model file should be placed at /public/models/wedding-cake.glb — use a placeholder comment in code where the model is loaded, noting the developer should supply this file
The WebGL canvas is pinned to the viewport using GSAP ScrollTrigger pin: true across this entire section
As the user scrolls through this section, drive the following animation timeline via ScrollTrigger scrub:

Tip left: The cake model rotates on the Z-axis from 0° to -30°, giving the appearance of tipping to the left. This should happen over the first 60% of the scroll distance through this section.
Smash: Over the remaining 40% of scroll, the cake drops rapidly on the Y-axis until it is below the bottom edge of the WebGL viewport, paired with a quick final Z-rotation push to -60°. Add a short CSS screen-shake animation on the container triggered at the moment the cake hits the bottom.


Lighting: use a warm ambient light and a soft directional light from the upper right to give the cake a wedding-appropriate feel
Background of the WebGL canvas should be transparent so the page background colour shows through


Section 3 — Ceremony Details & Map
This section appears below the cake animation. It contains two sub-sections that animate in as the user scrolls.
3a — Ceremony

Display the following placeholder content (developer to replace with real details):

Venue name: [CEREMONY VENUE NAME]
Address: [CEREMONY VENUE ADDRESS]
Date & Time: [DATE] at [TIME]


Below the text, render a Google Maps embed (using the Maps JavaScript API, not the iframe embed)
Place an "X" marker (custom SVG marker, styled to match the wedding aesthetic) at the ceremony location. Use placeholder coordinates [CEREMONY_LAT, CEREMONY_LNG] — developer to replace
The map should be non-interactive and styled with a clean, muted/greyscale custom map style appropriate for a wedding invitation aesthetic

3b — Reception Route Reveal

As the user continues to scroll past the ceremony details, use ScrollTrigger to trigger a dotted animated line drawn on the Google Map from the ceremony location to the reception location
Use the Google Maps Polyline with a dashed/dotted stroke style, animated to draw progressively using a setInterval or requestAnimationFrame loop that extends the path incrementally
Once the line is fully drawn, drop a second "X" marker at the reception location. Use placeholder coordinates [RECEPTION_LAT, RECEPTION_LNG] — developer to replace
Below the map, display reception placeholder details:

Venue name: [RECEPTION VENUE NAME]
Address: [RECEPTION VENUE ADDRESS]
Time: [RECEPTION TIME]




Section 4 — RSVP Form
This is the main interactive section. All form state should be saved to Supabase on submission. On page load, if the invitee already has a saved RSVP, pre-populate all fields with their existing responses.
4a — Attending Radio

Label: "Can you make it?"
Two radio options:

"Nah, yeah"
"Yeah, nah"


If the invitee's type is "Pom", render a translation note and inline labels:

"Nah, yeah" followed by (yes)
"Yeah, nah" followed by (no)
Below the radio group, display an italicised note: "We've added translations — we know this is confusing. You're very Pom."



4b — Dietary Requirements (conditional)

Shown only if the user selects "Nah, yeah" (attending)
Label: "Any dietary requirements?"
Free text <textarea>, placeholder: "e.g. vegetarian, nut allergy, gluten free..."

4c — Beer Vote (conditional)

Shown only if the user selects "Nah, yeah" (attending)
Label: "Help us stock the bar — what's your beer?"
Radio options:

Hazy Pale Ale
Lager
Sour
Ginger Beer
Other


If Other is selected, reveal a text input: "Tell us more..."

4d — Submit Button

Label: "Send it"
On click:

Validate that an attending option has been selected
If attending and no beer choice selected, show an inline validation error
Submit via a Next.js Server Action or API route that uses the Supabase service role client to UPDATE the invitee's row, matching on token
Fields updated: rsvp_attending, dietary_requirements, beer_choice, beer_other_details, updated_at
On success, show a confirmation message in place of the form:

If attending: "You're on the list. See you there 🎉"
If not attending: "We'll miss you. Thanks for letting us know 💛"


The confirmation should include a small "Change my answer" link that re-shows the form pre-populated with their saved responses, allowing edits at any time




Environment Variables Required
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

Additional Requirements

The app must be fully mobile responsive. The Three.js canvas should resize correctly on all screen sizes. The RSVP form should be thumb-friendly on mobile.
All Supabase writes must go through a server-side Next.js API route or Server Action using the service role key — never expose the service role key to the client
The token should never be stored in localStorage or any client-side persistent storage — read it fresh from the URL on every load
Include a loading state for the initial token lookup (spinner or skeleton), and a graceful error state for invalid tokens
The Google Maps API key should be restricted to your Vercel domain in the Google Cloud Console — add a comment in the code reminding the developer to do this
Add placeholder comments throughout the code wherever the developer needs to supply real content: model file, coordinates, venue names, dates