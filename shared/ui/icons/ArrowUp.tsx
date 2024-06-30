import { IconProps } from "@/shared/ui/icons/model.ts";

export function ArrowUp({width, height}: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M6.50008 17.9582H11.5001C16.0251 17.9582 17.9584 16.0248 17.9584 11.4998V6.49984C17.9584 1.97484 16.0251 0.0415039 11.5001 0.0415039H6.50008C1.97508 0.0415039 0.041748 1.97484 0.041748 6.49984V11.4998C0.041748 16.0248 1.97508 17.9582 6.50008 17.9582ZM1.29175 6.49984C1.29175 2.65817 2.65841 1.2915 6.50008 1.2915H11.5001C15.3417 1.2915 16.7084 2.65817 16.7084 6.49984V11.4998C16.7084 15.3415 15.3417 16.7082 11.5001 16.7082H6.50008C2.65841 16.7082 1.29175 15.3415 1.29175 11.4998V6.49984ZM11.5001 10.6582C11.6251 10.7832 11.7834 10.8416 11.9418 10.8416C12.1001 10.8416 12.2584 10.7832 12.3834 10.6582C12.6251 10.4166 12.6251 10.0166 12.3834 9.77489L9.44175 6.83323C9.20008 6.59156 8.80009 6.59156 8.55842 6.83323L5.61675 9.77489C5.37508 10.0166 5.37508 10.4166 5.61675 10.6582C5.85842 10.8999 6.25842 10.8999 6.50008 10.6582L9.00008 8.15823L11.5001 10.6582Z"
                  fill="#999FA6"/>
        </svg>

    )
}