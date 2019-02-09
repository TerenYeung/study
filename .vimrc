set nu
set tabstop=2
set shiftwidth=2
set expandtab
set clipboard=unnamed
" Disable annoying beeping
set noerrorbells
set vb t_vb=
set backspace=indent,eol,start

" tslint
let g:typescript_compiler_binary = 'tsc'
let g:syntastic_typescript_checkers = ['tsc', 'tslint'] " see tsc output
let g:syntastic_typescript_checkers = ['tslint', 'tsc'] " see tslint output
" NERDTree config
" open a NERDTree automatically when vim starts up
" autocmd vimenter * NERDTree
"open a NERDTree automatically when vim starts up if no files were specified
" autocmd StdinReadPre * let s:std_in=1
" autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif
"open NERDTree automatically when vim starts up on opening a directory
" autocmd StdinReadPre * let s:std_in=1
" autocmd VimEnter * if argc() == 1 && isdirectory(argv()[0]) && !exists("s:std_in") | exe 'NERDTree' argv()[0] | wincmd p | ene | endif
"map Ctrl-b to open NERDTree
map <c-b> :NERDTreeToggle<CR>
"close vim if the only window left open is a NERDTree
" autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif

" NERDTree config
let g:NERDTreeNodeDelimiter = "\u00a0"
" let g:NERDTreeDirArrowExpandable = '+'
" let g:NERDTreeDirArrowCollapsible = '-'
let NERDTreeShowBookmarks=1
let g:NERDTreeWinSize=30
let g:Tlist_WinWidth=30
let g:airline_powerline_fonts = 1
let g:ctrlp_dont_split = 'nerdtree'

" tern_for_vim
let g:ycm_min_num_of_chars_for_completion = 3
let g:ycm_autoclose_preview_window_after_completion=1
let g:ycm_complete_in_comments = 1
let g:ycm_key_list_select_completion = ['<c-n>', '<Down>']
let g:ycm_key_list_previous_completion = ['<c-p>', '<Up>']
function! MyTabFunction ()
    let line = getline('.')
    let substr = strpart(line, -1, col('.')+1)
    let substr = matchstr(substr, "[^ \t]*$")
    if strlen(substr) == 0
        return "\<tab>"
    endif
    return pumvisible() ? "\<c-n>" : "\<c-x>\<c-o>"
endfunction
inoremap <tab> <c-r>=MyTabFunction()<cr>

" Tagbar
let g:tagbar_width=35
let g:tagbar_autofocus=1
let g:tagbar_left = 0
nmap <c-t> :TagbarToggle<CR>

let g:tagbar_type_asciidoc = {
    \ 'ctagstype' : 'asciidoc',
    \ 'kinds' : [
        \ 'h:table of contents',
        \ 'a:anchors:1',
        \ 't:titles:1',
        \ 'n:includes:1',
        \ 'i:images:1',
        \ 'I:inline images:1'
    \ ],
    \ 'sort' : 0
\ }

let g:tagbar_type_css = {
\ 'ctagstype' : 'Css',
    \ 'kinds'     : [
        \ 'c:classes',
        \ 's:selectors',
        \ 'i:identities'
    \ ]
\ }

let g:tagbar_type_go = {
    \ 'ctagstype': 'go',
    \ 'kinds' : [
        \'p:package',
        \'f:function',
        \'v:variables',
        \'t:type',
        \'c:const'
    \]
\}

let g:tagbar_type_make = {
            \ 'kinds':[
                \ 'm:macros',
                \ 't:targets'
            \ ]
\}

let g:tagbar_type_markdown = {
    \ 'ctagstype' : 'markdown',
    \ 'kinds' : [
        \ 'h:Heading_L1',
        \ 'i:Heading_L2',
        \ 'k:Heading_L3'
    \ ]
\ }

let g:tagbar_type_ruby = {
    \ 'kinds' : [
        \ 'm:modules',
        \ 'c:classes',
        \ 'd:describes',
        \ 'C:contexts',
        \ 'f:methods',
        \ 'F:singleton methods'
    \ ]
\ }

let g:tagbar_type_typescript = {
  \ 'ctagsbin' : 'tstags',
  \ 'ctagsargs' : '-f-',
  \ 'kinds': [
    \ 'e:enums:0:1',
    \ 'f:function:0:1',
    \ 't:typealias:0:1',
    \ 'M:Module:0:1',
    \ 'I:import:0:1',
    \ 'i:interface:0:1',
    \ 'C:class:0:1',
    \ 'm:method:0:1',
    \ 'p:property:0:1',
    \ 'v:variable:0:1',
    \ 'c:const:0:1',
  \ ],
  \ 'sort' : 0
\ }

" vim-devicons
set guifont=DroidSansMono_Nerd_Font:h11
let g:WebDevIconsOS = 'Darwin'
" powerline
set rtp+=/usr/local/lib/python2.7/site-packages/powerline/bindings/vim/
set guifont=Consolas\ for\ Powerline\ FixedD:h11 
let g:Powerline_symbols = 'fancy'
set laststatus=2
set encoding=utf8
set t_Co=256
set fillchars+=stl:\ ,stlnc:\
set term=xterm-256color
set termencoding=utf8
set nocompatible
syntax on 
let g:solarized_termcolors=256

" Enable folding
set foldmethod=indent
set foldlevel=99
" Enable folding with the spacebar
nnoremap <space> za

"split navigations
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>

" au BufNewFile,BufRead *.js, *.html, *.css, *.ts
" au BufNewFile,BufRead *.py, *.php, *.rb, *.html, *.js, *.ts, *.md echomsg 'test'
\ set tabstop=2
\ set softtabstop=2
\ set shiftwidth=2
\ set expandtab
\ set autoindent
\ set fileformat=unix
\ match BadWhitespace /\s\+$/

" These lines setup the environment to show graphics and colors correctly.
 
let g:minBufExplForceSyntaxEnable = 1
" Specify a directory for plugins
" - For Neovim: ~/.local/share/nvim/plugged
" - Avoid using standard Vim directory names like 'plugin'
call plug#begin('~/.vim/plugged')

" ctrlp config
set wildignore+=*/tmp/*,*.so,*.swp,*.zip     " MacOSX/Linux
set wildignore+=*\\tmp\\*,*.swp,*.zip,*.exe  " Windows

let g:ctrlp_custom_ignore = {
  \ 'dir': '\v[\/](node_modules|target|dist)|(\.(swp|ico|git|svn))$',
  \ 'file': '\v\.(exe|so|dll)$',
  \ 'link': '',
  \ }

" lightline
let g:lightline = {
      \ 'colorscheme': 'seoul256',
      \ }
" Register tag name associated the filetype
autocmd FileType javascript JsPreTmpl
autocmd FileType javascript.jsx JsPreTmpl
autocmd FileType typescript JsPreTmpl
autocmd FileType typescript syn clear foldBraces " For leafgarland/typescript-vim users only. Please see #1 for details.

" conoline
let g:conoline_auto_enable = 1
"Make sure you use single quotes
Plug 'miyakogi/conoline.vim'
Plug 'jiangmiao/auto-pairs'
Plug 'tiagofumo/vim-nerdtree-syntax-highlight'
Plug 'itchyny/lightline.vim'
Plug 'ryanoasis/vim-devicons'
Plug 'Quramy/vim-js-pretty-template'
Plug 'hushicai/tagbar-javascript.vim'
Plug 'flazz/vim-colorschemes'
Plug 'editorconfig/editorconfig-vim'
Plug 'mattn/emmet-vim'
Plug 'leafgarland/typescript-vim'
Plug 'kien/ctrlp.vim'
Plug 'scrooloose/syntastic'
Plug 'Lokaltog/vim-powerline'
Plug 'majutsushi/tagbar'
Plug 'marijnh/tern_for_vim'
Plug 'tmhedberg/SimpylFold'

Plug 'Valloric/YouCompleteMe'
" Shorthand notation; fetches https://github.com/junegunn/vim-easy-align
Plug 'junegunn/vim-easy-align'

Plug 'andreypopp/vim-colors-plain'
" Any valid git URL is allowed
Plug 'https://github.com/junegunn/vim-github-dashboard.git'

" Multiple Plug commands can be written in a single line using | separators

" On-demand loading
" Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
Plug 'tpope/vim-fireplace', { 'for': 'clojure' }

" Using a non-master branch
Plug 'rdnetto/YCM-Generator', { 'branch': 'stable' }

" Using a tagged release; wildcard allowed (requires git 1.9.2 or above)
Plug 'fatih/vim-go', { 'tag': '*' }

" Plugin options
Plug 'nsf/gocode', { 'tag': 'v.20150303', 'rtp': 'vim' }

" 目录树
Plug 'scrooloose/nerdtree'

" Plugin outside ~/.vim/plugged with post-update hook
" Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }

" Unmanaged plugin (manually installed and updated)
Plug '~/my-prototype-plugin'

" Initialize plugin system
call plug#end()

" let &t_EI = "\<Esc>]50;CursorShape=2\x7"
" let &t_SI = "\<Esc>]50;CursorShape=1\x7"
"set guicursor=i:ver1-iCursor-blinkon0,v:block-vCursor
" Change cursor shape between insert and normal mode in iTerm2.app
""if $TERM_PROGRAM =~ "iTerm"
""    let &t_SI = "\<Esc>]50;CursorShape=1\x7" " Vertical bar in insert mode
    " let &t_EI = "\<Esc>]50;CursorShape=0\x7" " Block in normal mode
""endif

set background=dark " Set to dark for a dark variant
" colorscheme plain
colorscheme dark_plus
