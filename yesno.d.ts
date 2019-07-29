declare namespace yesno {
  export interface InvalidHandlerOptions {
    question: string;
    defaultValue?: boolean | null;
    yesValues?: string[];
    noValues?: string[];
  }

  export interface Options extends InvalidHandlerOptions {
    invalid?: (options: InvalidHandlerOptions) => void;
  }
}

declare function yesno(options: yesno.Options): Promise<boolean>;

export = yesno;
