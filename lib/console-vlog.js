/* eslint-disable no-console */
import { isProxy, isRef, toRaw, toValue, watch } from 'vue';

const OPTIONS = {
  override: false,
};

export default {
  install: (app, options = OPTIONS) => {
    const { override } = { ...OPTIONS, ...options };
    if (console) {
      const ogLog = console.log;
      console.vlog = function (exp, ...args) {
        let count = 0;
        let initiator = null;
        try {
          throw new Error();
        } catch (e) {
          for (const line of e.stack.split('\n')) {
            const url = line.match(/(?<=\s+at setup \()(.*)(?=\))/);
            if (url) {
              initiator = url[0];
            }
          }
          if (isRef(exp)) {
            watch(
              exp,
              () => {
                if (initiator) {
                  ogLog.call(
                    console,
                    `Ref(${count}):`,
                    `${initiator}\n  `,
                    toValue(exp),
                  );
                } else {
                  ogLog.call(console, `Ref(${count}):`, toValue(exp));
                }
                count++;
              },
              { immediate: true },
            );
          } else if (isProxy(exp)) {
            watch(
              exp,
              () => {
                if (initiator) {
                  ogLog.call(
                    console,
                    `Proxy(${count}):`,
                    `${initiator}\n  `,
                    toRaw(exp),
                  );
                } else {
                  ogLog.call(console, `Proxy(${count}):`, toRaw(exp));
                }
                count++;
              },
              { immediate: true },
            );
          } else {
            if (initiator) {
              ogLog.call(console, `${typeof exp}:`, exp);
            } else {
              ogLog.call(console, `${typeof exp}:`, `${initiator}\n  `, exp);
            }
          }
        }
        if (args?.length) {
          console.vlog(...args);
        }
      };

      if (override) {
        console.log = console.vlog;
      }
    }
  },
};
