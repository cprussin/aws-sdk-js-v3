// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  ListCommandsCommand,
  ListCommandsCommandInput,
  ListCommandsCommandOutput,
} from "../commands/ListCommandsCommand";
import { SSMClient } from "../SSMClient";
import { SSMPaginationConfiguration } from "./Interfaces";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: SSMClient,
  input: ListCommandsCommandInput,
  ...args: any
): Promise<ListCommandsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListCommandsCommand(input), ...args);
};
export async function* paginateListCommands(
  config: SSMPaginationConfiguration,
  input: ListCommandsCommandInput,
  ...additionalArguments: any
): Paginator<ListCommandsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListCommandsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof SSMClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected SSM | SSMClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
