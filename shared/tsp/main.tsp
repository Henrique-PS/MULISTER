import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Http;

@service(#{ title: "Mulister API" })
namespace MulisterAPI;

model Track {
  @doc("The unique identifier for the track")
  id: string;

  @doc("The International Standard Recording Code for the track")
  isrc: string;

  @doc("The name of the track")
  name: string;

  @doc("The list of artists for the track")
  artists: string[];
}

model Playlist {
  @doc("The unique identifier for the playlist")
  id: string;

  @doc("The name of the playlist")
  name: string;

  @doc("The description of the playlist")
  description?: string;

  @doc("The list of tracks in the playlist")
  tracks?: Track[];
}

model Streaming {
  @doc("The unique identifier for the streaming service")
  id: string;

  @doc("The name of the streaming service")
  name: string;

  @doc("The URL of the streaming service")
  url?: string;
}

@route("streaming")
@tag("Streaming")
interface StreamingController {
  @post
  @summary("Get access token for a streaming service")
  getAccessToken(@body streaming: Streaming): {
    access_token: string;
  } | {
    @statusCode _: 400;
  };
}

@route("transfer")
@tag("Playlist Transfer")
interface PlaylistTransfer {
  @post
  @summary("Transfer playlists from one audio streaming service to another")
  transfer(playlists: Playlist[], target_streaming: Streaming): void | {
    @statusCode _: 400;
  };
}
