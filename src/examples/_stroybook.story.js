import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Example } from '../../.storybook/components';

import { name, description } from '../../package.json';

import VectorMap from '../index';

import world from '../../maps/json/world-low-res.json';
import usa from '../../maps/json/usa.json';
import newZealand from '../../maps/json/new-zealand.json';
import allMaps from '../../maps/summary.json';

import SimpleEvents from './SimpleEvents';
import simpleEventsSource from '!raw-loader!./SimpleEvents';

import SelectMultiple from './SelectMultiple';
import selectMultipleSource from '!raw-loader!./SelectMultiple';

import HighlightLayer from './HighlightLayer';
import highlightLayerSource from '!raw-loader!./HighlightLayer';

import LayerLinks from './LayerLinks';
import layerLinksSource from '!raw-loader!./LayerLinks';

import TooltipLayers from './TooltipLayers';
import tooltipLayersSource from '!raw-loader!./TooltipLayers';

import MapStyling from './MapStyling';
import mapStylingSource from '!raw-loader!./MapStyling';

const basicExample = (varName, fileName) => `import VectorMap from '${name}';
import ${varName} from '${name}/maps/json/${fileName}.json';

export const MyMap = () => <VectorMap {...${varName}} />`;

const documentationStories = storiesOf('📖 Documentation', module);

documentationStories.addDecorator(withInfo);
documentationStories.addParameters({ info: { disable: true } });

documentationStories.add('Readme', () => (
  <>
    <div style={{ textAlign: 'center' }}>
      <h1>react-vector-maps</h1>
      <p>🗺️ {description}</p>
      <p>
        <a href="https://github.com/South-Paw/react-vector-maps">
          Check out the Github readme for the getting started guide 🎉
        </a>
      </p>
    </div>
    <div style={{ maxWidth: '500px', margin: '5rem auto' }}>
      <Example title="The World" code={basicExample('world', 'world')} isCodeOpen={false}>
        <VectorMap {...world} />
      </Example>
    </div>
    <div style={{ maxWidth: '500px', margin: '5rem auto' }}>
      <Example title="New Zealand" code={basicExample('newZealand', 'new-zealand')} isCodeOpen={false}>
        <VectorMap {...newZealand} />
      </Example>
    </div>
    <div style={{ maxWidth: '500px', margin: '5rem auto' }}>
      <Example title="USA" code={basicExample('usa', 'usa')} isCodeOpen={false}>
        <VectorMap {...usa} />
      </Example>
    </div>
    <h4 style={{ textAlign: 'center' }}>and a lot more other maps too, check out the 'Avaliable Maps' story.</h4>
  </>
));

documentationStories.add('VectorMap Component', () => <VectorMap {...newZealand} />, {
  info: { disable: false, inline: true },
});

documentationStories.add('Avaliable Maps', () => (
  <>
    <h1>Avaliable Maps</h1>
    <p>
      You can import a maps json file directly with the <strong>Filename</strong> as follows:
      <br />
      <code>
        import newZealand from '{name}/maps/json/<strong>new-zealand.json</strong>';
      </code>
    </p>
    <p>
      Below you'll find a list of all maps in the package.
      <br />
      You can also create and use your own maps; see the 'Using your own SVG for a map' story.
    </p>
    <table style={{ width: '100%', margin: '5rem 0' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Filename</th>
        </tr>
      </thead>
      <tbody>
        {allMaps.map(map => (
          <tr key={map.filename}>
            <td>{map.name}</td>
            <td>
              <code>{map.filename}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
));

documentationStories.add('Using your own SVG for a map', () => (
  <>
    <h1>Using your own SVG for a map</h1>
    <p>
      You can convert any SVG file into a usable JSON format for this package with the same converter util that is used
      to produce the included maps.
    </p>
    <div style={{ margin: '5rem 0' }}>
      <h2>Sample SVG</h2>
      <pre>{`<svg width="100" height="100">
  <path id="region-1" title="Awesome Region" d="..." />
  <path id="region-2" title="Some Other Area" d="..." />
  <path id="region-3" title="Another Location" d="..." />
</svg>`}</pre>
      <ul>
        <li>
          <code>width</code> and <code>height</code> are required attributes on the <code>&lt;svg /&gt;</code> element.
        </li>
        <li>
          The SVG is assumed to have a viewBox origin of <code>0 0</code> and uses the given <code>width</code> and{' '}
          <code>height</code> as the viewBox maximum values.
        </li>
        <li>
          Only <code>&lt;path /&gt;</code> elements will be converted to JSON.
        </li>
        <li>
          <code>id</code> and <code>d</code> attributes are required on all path elements and the <code>id</code> must
          be uniquie for each path.
        </li>
        <li>
          A <code>title</code> attribute on a path element will be used as the layers <code>name</code> field. If no
          title is present, the <code>id</code> will be capitalized and used.
        </li>
      </ul>
    </div>
    <div style={{ margin: '5rem 0' }}>
      <h2>Sample Node script</h2>
      <pre>{`const { ConvertSVGs } = require('${name}/maps/convert-svgs');

const convertSVGs = new ConvertSVGs({
  
  // Required: Path to folder containing the SVGs to convert to JSON.
  inputSvgsPath: \`\${__dirname}\\\\my\\\\svg\\\\inputs\`,

  // Required: Path to folder to output JSON files.
  // !! WARNING !!: This folder will be deleted and recreated by the script.
  outputJsonPath: \`\${__dirname}\\\\my\\\\json\\\\outputs\`,

});

convertSVGs.run();`}</pre>
      <p>
        After running this you'll have a folder at the path you specificed containing the SVG file converted to useable
        json for the component.
      </p>
      <p>
        Lastly to use your file, import or load that JSON file into your React component and spread it onto the
        VectorMap component. 🎉
      </p>
    </div>
  </>
));

const liveExampleStories = storiesOf('👨‍💻 Examples', module);

liveExampleStories.add('Simple events', () => (
  <Example title="Simple example" code={simpleEventsSource}>
    <SimpleEvents map={newZealand} />
  </Example>
));

liveExampleStories.add('Select multiple', () => (
  <Example title="Select multiple example" code={selectMultipleSource}>
    <SelectMultiple map={newZealand} />
  </Example>
));

liveExampleStories.add('Highlight layer', () => (
  <Example title="Highlight layer example" code={highlightLayerSource}>
    <HighlightLayer map={newZealand} />
  </Example>
));

liveExampleStories.add('Layers as links', () => (
  <Example title="Layers as links example" code={layerLinksSource}>
    <LayerLinks map={newZealand} />
  </Example>
));

liveExampleStories.add('Tooltips for layers', () => (
  <Example title="Tooltips for layers example" code={tooltipLayersSource}>
    <TooltipLayers map={newZealand} />
  </Example>
));

liveExampleStories.add('Styling maps', () => (
  <Example title="Styling maps example" code={mapStylingSource}>
    <MapStyling map={newZealand} />
  </Example>
));
