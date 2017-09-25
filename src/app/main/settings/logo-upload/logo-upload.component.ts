import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { AlertService, JwtService } from '../../../services';

@Component({
  selector: 'app-logo-upload',
  templateUrl: './logo-upload.component.html',
  styleUrls: ['./logo-upload.component.scss']
})
export class LogoUploadComponent implements OnInit, OnChanges {
  @Input('url')
  logoUrl: string;

  @Output() logoUrlChanged = new EventEmitter();

  uploader: FileUploader;

  uploadProgress: number;
  uploading: boolean = false;
  showRemoveBtn: boolean;
  showUploadProgress: boolean = false;
  showImageSelectModal: boolean = false;
  uploadBtnDisabled: boolean = true;

  constructor(private alertService: AlertService, private jwtService: JwtService) { 
    const uploadUrl = `${environment.apiUrl}/v1/orgs/logo`;

    this.uploader = new FileUploader({
      url: uploadUrl,
      autoUpload: false,
      allowedMimeType: [ 'image/png', 'image/jpg', 'image/jpeg' ],      
      method: 'POST',
      maxFileSize: 1 * 1024 * 1024,
      authToken: 'Bearer ' + this.jwtService.readToken()
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (fileItem) => {
      this.uploadBtnDisabled = false;
      fileItem.withCredentials = false;
    }

    this.uploader.onWhenAddingFileFailed = (fileItem) => {
      this.showImageSelectModal = false;
      this.alertService.error('Invalid file', 'Please select a png, jpg, jpeg image less than or equal to 1MB', {
        timeOut: 5000
      });
    }

    this.uploader.onProgressItem = (fileItem) => {
      this.uploadProgress = fileItem.progress;
      console.log(fileItem.progress);
    }

    this.uploader.onErrorItem = (fileItem) => {
      this.showImageSelectModal = false;
      this.uploading = false;
      this.alertService.error('Upload Error', 'Unable to upload file, an error has occured, please try again', {
        timeOut: 5000
      });
    }

    this.uploader.onCompleteItem = (fileItem, response, status) => {
      this.uploading = false;
      this.showImageSelectModal = false;
      this.showRemoveBtn = true;

      try {
        const response$ = JSON.parse(response);
        if (status === 200) {
          this.logoUrl = response$.url;
          this.logoUrlChanged.emit(response$.url);
        }
      } catch (error) {
        this.alertService.error('Upload Error', 'Unable to upload file, an error has occured, please try again', {
          timeOut: 5000
        });
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes.logoUrl.currentValue === 'string') {
      this.showRemoveBtn = true;
    } else {
      this.showRemoveBtn = false;
    }
  }

  startUpload() {
    this.uploadBtnDisabled = true;
    this.uploading = true;

    this.uploader.uploadAll();
  }

  removeLogo() {
    this.logoUrl = null;
    this.showRemoveBtn = false;
  }

  closeImageSelectModal() {
    this.showImageSelectModal = false;
    this.uploading = false;
    this.uploader.cancelAll()
    this.uploader.clearQueue()
  }
}
