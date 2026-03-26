import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Http;
using TypeSpec.Rest;

@service(#{ title: "Mulister API" })
namespace MulisterAPI;

model Teste {
  @doc("Teste")
  id: string
}

@route("/teste")
@tag("Teste")
interface ITeste {
  @get
  @summary("GET teste")
  list(): Teste[];

  @post
  @summary("POST teste")
  create(@body teste: Teste): Teste | {
    @statusCode _: 400;
  };
}
