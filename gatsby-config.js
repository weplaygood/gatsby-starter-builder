// In your gatsby-config.js
const path = require('path');
module.exports = {
  plugins: [
    {
      resolve: '@builder.io/gatsby',
      options: {
        // public API Key
        publicAPIKey: '1272919049fa4cc3a24247fc656ee810',
        // OPTIONAL
        // Set this to `true` to rely on our cached content. Default value is `false`, always fetching the newest content from Builder.
        useCache: false,
        // OPTIONAL
        // mapping model names to template files, the plugin will create a page for each entry of the model at its specified url
        templates: {
          // `page` can be any model of choice, camelCased
          page: path.resolve('templates/my-page.tsx'),
        },
        // OPTIONAL
        mapEntryToContext: async ({ entry, graphql }) => {
          const result = await graphql('....');
          return {
            property: entry.data.property,
            anotherProperty: entry.data.whatever,
            dataFromQuery: result.data
            /* ... */
          };
        },
        // OPTIONAL
        // to resolve a single entry to multiple, for e.g in localization
        resolveDynamicEntries: async (entries) => {
          const entriesToBuild = []
          for entry of entries {
            if (entry.data.myprop.isDynamic){
               entriesToBuild.push(await myEntryResolver(entry))
            }
            else {
               entriesToBuild.push(entry)
            }
          }
          return entriesToBuild;
        },
      },
    },
  ],
};
