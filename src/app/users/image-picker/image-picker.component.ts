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
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import * as Tesseract from 'tesseract.js';
import { UsersService } from '../users.service';
import * as Scanner from 'scanner.js';

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
    private usersService: UsersService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
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
      quality: 100,
      source: CameraSource.Prompt,
      correctOrientation: true,
      width: 200,
      allowEditing: true,
      resultType: CameraResultType.Base64
    })
      .then(image => {
        this.selectedImage = image.base64String;
        this.recognizeImage();
      })
      .catch(error => {
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
      this.recognizeImage();
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
          })
          .catch(error => {
            loadingEl.dismiss();
          })
          .then(result => {
            this.imageText = result.text;
          })
          .finally(resultOrError => {
            const splitString = this.imageText.split(/\n/gi);
            this.id = splitString[1];
            this.name = splitString[0];
            this.usersService.formIdFromOCR = splitString[1];
            this.usersService.formNameFromOCR = splitString[0];
            loadingEl.dismiss();
            this.presentToast();
          });
      });
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Sticker recognized successfuly, please check the accuracy of the data before submitting.',
      duration: 3000,
      color: 'primary'
    });
    toast.present();
  }
}
