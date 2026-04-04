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
  @doc("The name of the streaming service")
  name: string;

  @doc("The code to generate access token for the streaming service")
  code: string;
}

model GenerateTokensResponse {
  @doc("The access token for the streaming service")
  access_token: string;

  @doc("The refresh token for the streaming service")
  refresh_token?: string;
}

@route("streaming")
@tag("Streaming")
interface StreamingController {
  @post
  @summary("Generate access token for a streaming service")
  generateAccessToken(@body streaming: Streaming): GenerateTokensResponse | {
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
