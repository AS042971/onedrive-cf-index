import emojiRegex from 'emoji-regex/RGI_Emoji'
import { getClassNameForMimeType, getClassNameForFilename } from 'font-awesome-filetypes'

import { renderHTML } from './render/htmlWrapper'
import { renderPath } from './render/pathUtil'
import { renderMarkdown } from './render/mdRenderer'

/**
 * Convert bytes to human readable file size
 *
 * @param {Number} bytes File size in bytes
 * @param {Boolean} si 1000 - true; 1024 - false
 */
function readableFileSize(bytes, si) {
  bytes = parseInt(bytes, 10)
  var thresh = si ? 1000 : 1024
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }
  var units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  var u = -1
  do {
    bytes /= thresh
    ++u
  } while (Math.abs(bytes) >= thresh && u < units.length - 1)
  return bytes.toFixed(1) + ' ' + units[u]
}

/**
 * Render Folder Index
 *
 * @param {*} items
 * @param {*} isIndex don't show ".." on index page.
 */
export async function renderFolderView(items, path, request) {
  const isIndex = path === '/'

  const el = (tag, attrs, content) => `<${tag} ${attrs.join(' ')}>${content}</${tag}>`
  const div = (className, content) => el('div', [`class=${className}`], content)
  const item = (icon, fileName, fileAbsoluteUrl, size, emojiIcon) =>
    el(
      'a',
      [`href="${fileAbsoluteUrl}"`, 'class="item"', size ? `size="${size}"` : ''],
      (emojiIcon ? el('i', ['style="font-style: normal"'], emojiIcon) : el('i', [`class="${icon}"`], '')) +
      fileName +
      el('div', ['style="flex-grow: 1;"'], '') +
      (fileName === '..' ? '' : el('span', ['class="size"'], readableFileSize(size)))
    )

  const intro = `<div class="intro markdown-body" style="text-align: left; margin-top: 2rem;">
                    <h2>Yoo, I'm Spencer Woo 👋</h2>
                    <p>This is Spencer's OneDrive public directory listing. Feel free to download any files that you find useful. Reach me at: spencer.wushangbo [at] gmail [dot] com.</p>
                    <p><a href="https://spencerwoo.com">Portfolio</a> · <a href="https://blog.spencerwoo.com">Blog</a> · <a href="https://github.com/spencerwooo">GitHub</a></p>
                  </div>`

  const statusScript = `<script>
                    async function UrlExists(url) {
                      return new Promise((resolve, reject) => {
                        var http = new XMLHttpRequest();
                        http.onload = (e => {
                          if (http.status == 200) {
                            resolve(true);
                          } else {
                            resolve(false);
                          }
                        })
                        http.open('HEAD', url, true);
                        http.send();
                      })
                    }

                    var oldHref = document.location.href;

                    window.addEventListener("load", function (event) {
                      var observer = new MutationObserver(function(mutations) {
                        mutations.forEach(function(mutation) {
                          if (oldHref != document.location.href) {
                            oldHref = document.location.href;
                    var items = document.querySelectorAll('.item');
                    items.forEach((item) => {
                      var link = item.href;
                      if (link.endsWith('.mp4')) {
                        var fileName = link.split('/').pop();
                        var xmlUrl = 'https://dm.asdanmaku.com/Xml/' + fileName.replace('.mp4', '.xml');
                        var pbfUrl = 'https://dm.asdanmaku.com/Pbf/' + fileName.replace('.mp4', '.pbf');

                        UrlExists(pbfUrl).then(result => {
                          if (result) {
                            var badge = document.createElement('img');
                            badge.src = 'https://img.shields.io/badge/时间轴-lightgrey';
                            badge.setAttribute('style', 'margin:0px 3px;')
                            item.insertBefore(badge, item.childNodes[3]);
                          }
                        })
                        UrlExists(xmlUrl).then(result => {
                          if (result) {
                            var badge = document.createElement('img');
                            badge.src = 'https://img.shields.io/badge/弹幕-lightgrey';
                            badge.setAttribute('style', 'margin:0px 3px;')
                            if (item.childNodes.length == 4) {
                              item.insertBefore(badge, item.childNodes[3]);
                            } else {
                              item.insertBefore(badge, item.childNodes[4]);
                            }
                          }
                        })
                      }
                    })
                          }
                        })
                      })
                    })
                  </script>`

  // Check if current directory contains README.md, if true, then render spinner
  let readmeExists = false
  let readmeFetchUrl = ''

  const body = div(
    'container',
    div('path', renderPath(path)) +
    div(
      'items',
      el(
        'div',
        ['style="min-width: 600px"'],
        (!isIndex ? item('far fa-folder', '..', `${path}..`) : '') +
        items
          .map(i => {
            // Check if the current item is a folder or a file
            if ('folder' in i) {
              const emoji = emojiRegex().exec(i.name)
              if (emoji && !emoji.index) {
                return item('', i.name.replace(emoji, '').trim(), `${path}${i.name}/`, i.size, emoji[0])
              } else {
                return item('far fa-folder', i.name, `${path}${i.name}/`, i.size)
              }
            } else if ('file' in i) {
              // Check if README.md exists
              if (!readmeExists) {
                // TODO: debugging for README preview rendering
                console.log(i)

                readmeExists = i.name.toLowerCase() === 'readme.md'
                readmeFetchUrl = i['@microsoft.graph.downloadUrl']
              }

              // Render file icons
              let fileIcon = getClassNameForMimeType(i.file.mimeType)
              if (fileIcon === 'fa-file') {
                // Check for files that haven't been rendered as expected
                const extension = i.name.split('.').pop()
                if (extension === 'md') {
                  fileIcon = 'fab fa-markdown'
                } else if (['7z', 'rar', 'bz2', 'xz', 'tar', 'wim'].includes(extension)) {
                  fileIcon = 'far fa-file-archive'
                } else if (['flac', 'oga', 'opus'].includes(extension)) {
                  fileIcon = 'far fa-file-audio'
                } else {
                  fileIcon = `far ${getClassNameForFilename(i.name)}`
                }
              } else {
                fileIcon = `far ${fileIcon}`
              }
              return item(fileIcon, i.name, `${path}${i.name}`, i.size)
            } else {
              console.log(`unknown item type ${i}`)
            }
          })
          .join('')
      )
    ) +
    (readmeExists && !isIndex ? await renderMarkdown(readmeFetchUrl, 'fade-in-fwd', '') : '') +
    (isIndex ? intro : '')
  ) + statusScript
  return renderHTML(body, ...[request.pLink, request.pIdx])
}
