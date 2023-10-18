/*!
pnpmでインストールして使うと以下のエラーが発生するためこちらで使用
Module not found: Can't resolve 'canvas'

https://github.com/igsr5/metagros/

MIT License

Copyright (c) 2022 Sora Ichigo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import type { IncomingMessage } from "http";
import * as https from "https";
import { JSDOM } from "jsdom";

export const ogKey = [
  "title",
  "description",
  "image",
  "type",
  "siteName",
  "url",
] as const;

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number];
export type Metadata = {
  [k in ArrayElement<typeof ogKey>]?: string;
};

export const getPageOGPMetadata = async (url: string): Promise<Metadata> => {
  const body = await getHTMLHeadFromUrl(url);
  const dom = new JSDOM(body);
  const metadata: Metadata = {};

  ogKey.forEach((v) => {
    try {
      const content = dom.window.document
        .querySelector(`meta[property='og:${snakeCase(v)}']`)
        ?.getAttribute("content");

      metadata[v] = content !== null ? content : undefined;
    } catch {
      // noop
    }
  });

  return metadata;
};

export const getHTMLHeadFromUrl = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res: IncomingMessage) => {
        let body = "";

        res.setEncoding("utf8");
        res.on("data", (chunk: string) => {
          body += chunk;
          if (body.split("</head>").length > 1) {
            body = body.split("</head>")[0]!;
            resolve(body);
          }
        });
      })
      .on("error", reject);
  });
};

export const snakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, function (s) {
    return "_" + s.charAt(0).toLowerCase();
  });
};
