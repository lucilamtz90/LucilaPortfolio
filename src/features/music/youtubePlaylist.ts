// YouTube Music has no public embeddable player/API — this plays the same underlying
// videos via the standard YouTube IFrame Player API, pointed at the identical playlist.
export const MUSIC_PLAYLIST_ID = 'OLAK5uy_m_Lzi_HWS7_-QEKfZ_q-XC9yL9dNcT24M';

// The IFrame Player API has no album field (and fetching the playlist page itself for its
// title isn't possible client-side — YouTube doesn't send CORS headers for it), so this is
// set by hand and needs updating whenever MUSIC_PLAYLIST_ID above changes.
export const MUSIC_ALBUM_NAME = 'Fallen Angel (Digital EP)';
