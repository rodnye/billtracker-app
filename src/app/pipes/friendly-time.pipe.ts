import { Pipe, PipeTransform, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
 

@Pipe({
  name: 'friendlyTime',
  standalone: true,
})
export class FriendlyTimePipe implements PipeTransform {
  private datePipe = inject(DatePipe);

  transform(value: Date | string | number): string {
    if (!value) return 'Fecha no disponible';

    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Fecha inválida';

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const inputDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    // format exactly hour
    const exactTime = this.datePipe.transform(date, 'HH:mm') || '';

    // check if today
    if (inputDate.getTime() === today.getTime()) {
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) return `${exactTime} (Hace unos segundos)`;
      if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${exactTime} (Hace ${minutes} minuto${minutes !== 1 ? 's' : ''})`;
      }
      if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${exactTime} (Hace ${hours} hora${hours !== 1 ? 's' : ''})`;
      }
    }

    // if not, show full date
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy') || '';
    return `${exactTime} - ${formattedDate}`;
  }
}
