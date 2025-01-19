export class TextUtility {

  /**
   * Remplacement text
   * @param initialText  string - text initial
   * @param textToBeUpdate  string - text a remplacer
   * @param textToInsert string - texte a inserer
   * @returns string
   */
  static replace(initialText: string, textToBeUpdate: string, textToInsert: string): string {
    return initialText.replace(textToBeUpdate, textToInsert);
  }
}
