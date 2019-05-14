import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from '@capacitor/core';
import { Platform, LoadingController } from '@ionic/angular';
import * as Tesseract from 'tesseract.js';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filepicker') filepickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();
  selectedImage: string;
  usePicker = false;
  imageText: string;
  id: string;
  name: string;

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    console.log('Mobile:', this.platform.is('mobile'));
    console.log('Hybrid:', this.platform.is('hybrid'));
    console.log('ios:', this.platform.is('ios'));
    console.log('Android:', this.platform.is('android'));
    console.log('Desktop:', this.platform.is('desktop'));
    if (
      (this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera') || this.usePicker) {
      this.filepickerRef.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Camera,
      correctOrientation: true,
      width: 200,
      resultType: CameraResultType.Base64
    })
      .then(image => {
        this.selectedImage = image.base64String;
        this.imagePick.emit(image.base64String);
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }

  recognizeImage() {
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: 'Analysing Sticker...'
      })
      .then(loadingEl => {
        loadingEl.present();
        Tesseract.recognize(this.selectedImage)
          .progress(message => {
            console.log(message);
          })
          .catch(error => {
            console.error(error);
            loadingEl.dismiss();
          })
          .then(result => {
            this.imageText = result.text;
            console.log(this.imageText);
          })
          .finally(resultOrError => {
            const splitString = this.imageText.split(/\n/ig);
            console.log(splitString);
            this.id = splitString[1];
            this.name = splitString[0];
            this.usersService.formIdFromOCR = splitString[1];
            this.usersService.formNameFromOCR = splitString[0];
            loadingEl.dismiss();
          });
      });
  }
}
