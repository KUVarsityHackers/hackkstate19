import { useEffect } from 'react';
import React from 'react';

function Stream (props: any) {

const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = false;
    script.setAttribute("arg", props.session);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};



return (
      <div id="scriptId">
          {useScript("https://meet.jit.si/external_api.js")}
          {useScript("/JitsiScript.js")}
      </div>
    );
}

export default Stream;