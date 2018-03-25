import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Modal } from '@clr/angular';
import { FileSelectDirective, FileUploader, FileItem } from 'ng2-file-upload';
import { JwtService, SessionService } from '../../../services';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.scss']
})
export class ImportModalComponent implements OnInit {

  @ViewChild('modal') modal: Modal;
  title: string;
  mode: string;
  templateFile: string;

  uploadErrorMessage: string;
  uploader: FileUploader;
  uploading: boolean = false;
  uploadProgress: number = 0;
  disableImportBtn: boolean = true;
  @Output() uploadComplete: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private session: SessionService,
    private jwtService: JwtService
  ) {
  }

  private setupUploader() {
    const org: any = this.session.getDefaultOrg();
    const uploadUrl = `${environment.apiUrl}import?repository=${this.mode}&org_id=${org.id}`;
    this.uploader = new FileUploader({
      url: uploadUrl,
      autoUpload: false,
      allowedMimeType: [ 'application/csv', 'application/x-csv', 'text/csv' ],
      method: 'POST',
      maxFileSize: 1 * 1024 * 1024,
      authTokenHeader: 'Authorization',
      authToken: `Bearer ${this.jwtService.readToken()}`
    });
  }

  private setupImportMode() {
    switch (this.mode) {
      case 'contacts':
        this.title = 'Import Contacts'
        this.templateFile = 'assets/import-templates/contactstemplate.csv'
        break;
      case 'employees':
        this.title = 'Import Employees'
        break;
    }
  }

  setMode(mode: string) {
    const allowed = ['contacts', 'employees']
    if (allowed.indexOf(mode) !== -1) {
      this.mode = mode;
      this.setupImportMode();
      this.setupUploader();
      return;
    }
    throw new Error(`Unknown import mode set. Allowed modes: ${allowed.toString()}`);
  }

  import() {
    this.uploading = true;
    this.uploader.uploadAll();
  }

  ngOnInit() {
    this.uploader.onAfterAddingAll = (files: FileItem[]) => {
      this.uploadErrorMessage = null;
      this.disableImportBtn = false;
      files.forEach(file => {
        file.withCredentials = false;
      })
    }

    this.uploader.onWhenAddingFileFailed = (file) => {
      this.uploadErrorMessage = 'Please select a valid CSV file';
    }

    this.uploader.onProgressItem = (file: FileItem) => {
      this.uploadProgress = file.progress;
    }

    this.uploader.onErrorItem = (file: FileItem) => {
      this.uploadErrorMessage = 'Unable to upload file, an error has occured, please try again';
      this.uploading = false;
      this.disableImportBtn = false;
      console.log(file);
    }

    this.uploader.onCompleteItem = (file, response, status, headers) => {
      const data = JSON.parse(response);
      if (data.status === 'success' && status === 200) {
        this.uploading = false;
        this.uploadComplete.emit(true);
      }
    }
  }

}
