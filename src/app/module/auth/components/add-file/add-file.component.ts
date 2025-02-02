import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent {

  @Input() inputFileFormControlName!: string;
  @Input() fg!:FormGroup
  @Input() properties: any;

  // Document selectionné
  @Output() selectedFileEmitter = new EventEmitter<File>();

  fileSelected: File|undefined;
  isFileSelected: boolean = false;
  isFilePdfType: boolean = false;
  isFileOfImageType = false;
  previewFileFileBase64: string ='';
  fileTitle:  string = '';


  /**
   * Chargement du document
   * @param
   */
  loadSelectedFile(file: File | undefined){
    this.isFileSelected = false;
    this.isFilePdfType = false;
    this.isFileOfImageType =  false;
    this.fileTitle = '';
    this.selectedFileEmitter.emit(file);

    if(file){
      this.fileSelected = file;
      this.fileTitle = file.name;

      if (file.type === 'application/pdf')
        this.isFilePdfType = true;

      if(file.type.startsWith('image/'))
        this.isFileOfImageType = true;

      const fileReader = new FileReader();
      // Lecture image
      fileReader.readAsDataURL(file);
      fileReader.onload = ()=> {
        this.previewFileFileBase64 = fileReader.result as string;
        this.isFileSelected = true;
      }
    }
  }
}
