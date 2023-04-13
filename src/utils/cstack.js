import ContentstackLivePreview from "@contentstack/live-preview-utils";
import Contentstack from "contentstack";
Contentstack.Utils.addEditableTags();

const Stack = Contentstack.Stack({
    "api_key": "bltf3ef6e330b58a224",
    "delivery_token": "cs76f73fa2edd17a73a2ce51a1",
    "environment": "preview",
    live_preview: {
      management_token: 'cs05107c413bdddb405094fd78',
      enable: true,
      host: 'api.contentstack.io',
    }
  });

  
  ContentstackLivePreview.init({
    stackSdk: Stack,
    clientUrlParams: {
        protocol: "https",
        host: "app.contentstack.com",
        port: 443,
    },
  });
  
  export default {
    getElement(id, type) {
      return new Promise((resolve, reject) => {
        const Query = Stack.ContentType(type)
          .Entry(id)
          .toJSON()
          .fetch()
          .then(
            function success(entry) {
              Contentstack.Utils.addEditableTags(entry, type, true);
              resolve(entry);
            },
            function error(err) {
              console.log('error id', id);
              reject(err);
            }
          );
      });
    },
    
    getElementWithRefs(id, type, references) {
      return new Promise((resolve, reject) => {
        const Query = Stack.ContentType(type)
          .Entry(id)
          .includeReference(...references)
          .toJSON()
          .fetch()
          .then(
            function success(entry) {
              Contentstack.Utils.addEditableTags(entry, type, true);
              resolve(entry);
            },
            function error(err) {
              console.log('error id', id);
              reject(err);
            }
          );
      });
    },
    // get nav call
    getStack(){
      return Stack;
    }
  };
  
  export const onEntryChange = ContentstackLivePreview.onEntryChange;