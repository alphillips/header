const URL_BASE = '/nexdoc/api/'

import {get, post, put, del, formPost} from '@react-ag-components/core/lib/api'

export function getHelpPages(is_staff){
  return get(URL_BASE + 'refdata/help-page?internalSite='+is_staff)
}
