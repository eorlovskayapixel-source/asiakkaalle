export class Level {
  constructor(id, text) {
    this.id = id;
    this.text = text; //The visible text that will be shown to the user in the UI
  }

  static fromData(data) {
    return new Level(data.id, data.text);
  }
}
