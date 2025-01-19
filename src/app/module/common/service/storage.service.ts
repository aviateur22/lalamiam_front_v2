import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * Récupération d'un données à partir d'une clé
   * @param itemKey string - clé
   * @returns Strting - renvoie la valeur associé à la clé
   */
  getItem(itemKey: string): string {
    let value = localStorage.getItem(itemKey);
    return value ?? '';
  }

  /**
   * Sauvegarde une donnée avec une clé
   * @param itemKey string - clé
   * @param itemValue string - donnée
   */
  setItem(itemKey: string, itemValue: string): void {
    localStorage.setItem(itemKey, itemValue);
  }
}
