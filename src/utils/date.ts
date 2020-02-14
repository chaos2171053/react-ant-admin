import moment from 'moment';
moment.locale('zh-cn');
export function formatDate(date?: string | Date | undefined, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    return moment().format(format);
  }
  return moment(date).format(format);
}
