import { type StreamingDTO } from '@mulister/shared';
import { Body, Controller, Post } from '@nestjs/common';
import { StreamingAdapterFactory } from '../factories/streaming-adapter.factory';

@Controller('streaming')
export class StreamingController {
  constructor(
    private readonly streamingAdapterFactory: StreamingAdapterFactory,
  ) {}

  @Post()
  async getAccessToken(@Body() streamingDTO: StreamingDTO) {
    const { name } = streamingDTO;

    const streamingAdapter =
      this.streamingAdapterFactory.createStreamingAdapter(name.toLowerCase());
    return await streamingAdapter.getAccessToken();
  }
}
