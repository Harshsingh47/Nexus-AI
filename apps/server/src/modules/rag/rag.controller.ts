import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RAGService } from './rag.service';

@ApiTags('Knowledge Base (RAG)')
@Controller('rag')
export class RAGController {
  constructor(private readonly ragService: RAGService) {}

  @Get('documents')
  @ApiOperation({ summary: 'List uploaded documents in Knowledge Base' })
  async getDocuments() {
    return this.ragService.listDocuments();
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload and chunk document for RAG vector search' })
  async uploadDocument(@Body() body: { name: string; fileType: string; sizeBytes: number; content?: string }) {
    return this.ragService.uploadAndIngest(body);
  }

  @Post('query')
  @ApiOperation({ summary: 'Query knowledge base vector embeddings' })
  async queryKnowledge(@Body() body: { query: string; topK?: number }) {
    return this.ragService.searchVectorKnowledge(body.query, body.topK);
  }
}
