import { UTILS } from '@/common/Utils';
import { ICursorService } from '@/services/CursorService/interfaces/ICursorService';

export class CursorService implements ICursorService {
    private static VOID_NODE_TAGS: string[] = [
        'AREA',
        'BASE',
        'BR',
        'COL',
        'EMBED',
        'HR',
        'IMG',
        'INPUT',
        'KEYGEN',
        'LINK',
        'MENUITEM',
        'META',
        'PARAM',
        'SOURCE',
        'TRACK',
        'WBR',
        'BASEFONT',
        'BGSOUND',
        'FRAME',
        'ISINDEX'
    ];

    private contentEditableNode: Node;

    constructor(contentEditableNode: Node) {
        this.contentEditableNode = contentEditableNode;
    }

    public setEndOfContentEditable(): void {
        while (this.contentEditableNode.lastChild && this.canContainText(this.contentEditableNode.lastChild)) {
            this.contentEditableNode = this.contentEditableNode.lastChild;
        }
        const range: Range = document.createRange();
        range.selectNodeContents(this.contentEditableNode);
        range.collapse(false);
        const selection: Selection | null = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
    }

    private canContainText(element: Node): boolean {
        return !CursorService.VOID_NODE_TAGS.includes(element.nodeName);
    }
}
