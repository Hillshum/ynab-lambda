import { APIGatewayProxyResult, APIGatewayProxyEvent, Handler } from "aws-lambda";

export default (func: (body: string)=>Promise<APIGatewayProxyResult>) =>{
  const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
    if (event.body === null) {
      throw new Error('missing POST body');
    }
    return func(event.body);
  }
}