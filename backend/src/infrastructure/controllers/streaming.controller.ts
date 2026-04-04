import { GenerateTokensResponseDTO, type StreamingDTO } from '@mulister/shared';
import { Body, Controller, Post } from '@nestjs/common';
import { StreamingAdapterFactory } from '../factories/streaming-adapter.factory';

@Controller('streaming')
export class StreamingController {
  constructor(
    private readonly streamingAdapterFactory: StreamingAdapterFactory,
  ) {}

  @Post()
  async generateAccessToken(
    @Body() streamingDTO: StreamingDTO,
  ): Promise<GenerateTokensResponseDTO> {
    const { name, code } = streamingDTO;

    const streamingAdapter =
      this.streamingAdapterFactory.createStreamingAdapter(name.toLowerCase());
    const tokens = await streamingAdapter.generateTokens(code);
    return tokens;
  }
}
