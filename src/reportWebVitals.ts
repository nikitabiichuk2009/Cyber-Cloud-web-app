import { ReportHandler } from 'web-vitals'
import * as WebVitals from 'web-vitals'

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
      WebVitals.getCLS(onPerfEntry)
      WebVitals.getFID(onPerfEntry)
      WebVitals.getFCP(onPerfEntry)
      WebVitals.getLCP(onPerfEntry)
      WebVitals.getTTFB(onPerfEntry)
  }
}

export default reportWebVitals
