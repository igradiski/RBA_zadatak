export interface CustomFile extends File {
  readonly lastModified: number;
  readonly name: string;
  readonly id: string;
}
